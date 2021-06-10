const { validationResult } = require("express-validator");
const User = require("../models/User");

module.exports = {
    index: (request, response) => {
        response.render("index");
    },
    register: async (request, response) => {
        const errors = validationResult(request);
        const getEmail = await User.checkEmail(request.body.email);
        let messages = [{ "type": "error", "msg": [] }];

        if(getEmail.length > 0){
            messages[0]["msg"].push({
                "element": "email",
                "message": "This email is already registered"
            });
        }
        
        if(!errors.isEmpty() || request.body.password != request.body.confirm_password){
            errors.array().forEach(value => {
                messages[0]["msg"].push({
                    "element": value.param,
                    "message": value.msg
                });
            });
            if(request.body.password != request.body.confirm_password){
                messages[0]["msg"].push({
                    "element": "confirm_password",
                    "message": "Passwords doesn't match"
                });
            }

            const alert = messages;
            response.render("templates/registration_errors", { alert });
        }
        else{
            await User.register(request.body.email, request.body.first_name, request.body.last_name, request.body.password);
            const alert = [{"type": "success", "msg": "You're successfully registered"}];
            response.render("templates/registration_errors", { alert });
        }
    },
    login: async (request, response) => {
        const login = await User.login(request.body.email, request.body.password);
        if(login == null){
            response.render("templates/login_error", { message: "Incorrect username or password" });
        }
        else{
            request.session.user_id = login._id;
            request.session.email = login.email;
            request.session.first_name = login.first_name;
            request.session.last_name = login.last_name;

            response.render("templates/login_error", { message: "Success" });
        }
    },
    profile: (request, response) => {
        if(request.session.user_id != null){
            const user_data = {
                "id": request.session.user_id,
                "email": request.session.email,
                "first_name": request.session.first_name,
                "last_name": request.session.last_name,
            }
            response.render("profile", { data: user_data });
        }
        else{
            response.redirect("/");
        }
    },
    logout: (request, response) => {
        request.session.destroy();
        response.redirect("/");
    }
}