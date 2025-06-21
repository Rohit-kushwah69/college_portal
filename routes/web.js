const express = require('express')
const route = express.Router();
const checkAuth = require('../middleware/auth')
const FrontController = require('../controllers/FrontController')
const ContactController = require('../controllers/ContactController')
const CourseController = require('../controllers/CourseController')
const AdminController = require('../controllers/admin/AdminController')
const adminRole = require('../middleware/adminRole')
const isLogin = require('../middleware/isLogin')
const nodemailer = require("nodemailer")



// rounts
route.get('/', FrontController.login)
route.get('/home', checkAuth, FrontController.home)
route.get('/contact', checkAuth, FrontController.contact)
route.get('/about', checkAuth, FrontController.about)
route.get('/register', FrontController.register)
route.get('/logout', FrontController.logout)

//insert data   
route.post('/userinsert', FrontController.userinsert)
// verifyLogin
route.post('/verifyLogin', FrontController.verifyLogin)


//course
route.post('/course_insert', checkAuth, CourseController.createCourse)
route.get('/courseDisplay',checkAuth, CourseController.courseDisplay)

//display view edit button
route.get("/ViewCourse/:id", checkAuth, CourseController.ViewCourse);
route.get("/EditCourse/:id", checkAuth, CourseController.EditCourse);
route.get("/DeleteCourse/:id", checkAuth, CourseController.DeleteCourse);
route.post("/courseUpdate/:id", checkAuth, CourseController.courseUpdate);

// profile
route.get('/profile', checkAuth, FrontController.profile)
route.post('/changePassword',checkAuth,FrontController.changePassword)
route.post('/updateProfile',checkAuth, FrontController.updateProfile)

//contact
route.post("/createContact", checkAuth, ContactController.createContact);

//admincontroller
route.get("/admin/dashboard", checkAuth,adminRole('admin'), AdminController.dashboard);
route.get('/admin/courseDisplay',checkAuth, adminRole('admin'), AdminController.courseDisplay)
route.post('/admin/update_status/:id', checkAuth,adminRole('admin'),  AdminController.update_status)
route.get('/admin/ContactDisplay', checkAuth,adminRole('admin'),  AdminController.ContactDisplay)
route.get('/Viewadmin/:_id', checkAuth,adminRole('admin'),  AdminController.Viewadmin)
route.get('/Editadmin/:_id', checkAuth,adminRole('admin'),  AdminController.Editadmin)
route.get("/Deleteadmin/:_id", checkAuth,adminRole('admin'),  AdminController.Deleteadmin);
route.post("/Updateadmin/:_id", checkAuth,adminRole('admin'),  AdminController.Updateadmin);
//Admin profile update
route.get("/admin/profile_update", checkAuth,adminRole('admin'),  AdminController.profile_update);
route.post("/admin/changePassword", checkAuth,adminRole('admin'),  AdminController.changePassword);
route.get("/admin/update_pass", checkAuth,adminRole('admin'),  AdminController.update_pass);
route.post("/admin/updateProfile", checkAuth,adminRole('admin'),  AdminController.updateProfile);
route.get("/admin/approvedUsers", checkAuth,adminRole('admin'),  AdminController.ApprovedUsers);
route.get("/admin/pendingUsers", checkAuth,adminRole('admin'),  AdminController.PendingUsers);
route.get("/admin/rejectedUsers", checkAuth,adminRole('admin'),  AdminController.RejectUsers);


//forgot password
route.post('/forgot_Password',FrontController.forgetPasswordVerify)
route.get('/reset-password',FrontController.reset_Password)
route.post('/reset_Password1',FrontController.reset_Password1)
route.get('/register/verify',FrontController.verifyMail)


module.exports = route;