## Task Title: Authentication System
Create an authentication system, with the following features
1. Register, Login, Logout (use bcrypt to hash password) //
2. Add roles for users, staff, managers, admin //
3. protect the user route, staff route, manager route, and admin route with JSON web token //
4. password recovery

<!-- we'll structure our codes 
-controllers
-models
-roiutes
 -->
### so we're Building a server.
You are to build a server for an online node app that has three categories of users:User,Admin,managers and
staffs.
it should be an authentication system that can Register, Login, Logout users(using bcrypt to hash password)
and Add roles for those users and delegate their privleges using "Access Contol" method
A user can register as a anything but the admin on this platform.Afterwards,they can view all categories
they can belong to.
protect your Routes to all catgories using JsonWeb Token
and password recovery incase a user forgets their login credentials
The last category of users is the admin.No one can sign up as an admin.Only Managers can become
admins.

<!-- NOTE You are expected to provide admin log in details on your readme when documenting your APIs. 
I will be testing the admin routes with the admin details you provide on your readme,However,I
will sign up as a staff and a manager to test other functionalities.Ideally,a user should not be able
to carry out actions they are not privileged to.You should take this into consideration and protect
your routes.-->

## userModels
-name(first & lastname)
-password
-email
-role
-isadmin(boolean,false)
-ismanager(boolean,false)

[](../../../../Pictures/Screenshots/Screenshot%20(635).png%0D) [](../../../../Pictures/Screenshots/Screenshot%20(634).png%0D) [](../../../../Pictures/Screenshots/Screenshot%20(633).png%0D) [](../../../../Pictures/Screenshots/Screenshot%20(632).png%0D) [](../../../../Pictures/Screenshots/Screenshot%20(631).png%0D) [](../../../../Pictures/Screenshots/Screenshot%20(630).png%0D) [](../../../../Pictures/Screenshots/Screenshot%20(638).png%0D) [](../../../../Pictures/Screenshots/Screenshot%20(637).png%0D) ![](../../../../Pictures/Screenshots/Screenshot%20(636).png) 