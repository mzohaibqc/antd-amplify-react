# antd-amplify-react
This package contains AWS Amplify React components for Authentication (`SignUp`, `ConfirmSignUp`, `SignIn`, `SignOut`, `RequireNewPassword`, `ForgotPassword`)

### Install
> npm i -S antd-amplify-react

### Usage

There are two components for each kind of component. One contains just `Form` and other is wrapped in a container i.e. `Card`
e.g. there is a component `SignInForm` without any container and `SignIn` with Card container. If you want more customizations in terms of layout, use Form otherwise components with Card container are simple to use.

There is a special component `AuthFlow` which contains all above mentioned components in a single container and it handles all authentication flows and changes UI according to auth state.

```
<AuthFlow tabPosition="top" />
```
![AuthFlow](https://raw.githubusercontent.com/mzohaibqc/antd-amplify-react/master/images/authflow2.png?raw=true "AuthFlow")

```
<AuthFlow userRadioButtons />
```
![AuthFlow](https://raw.githubusercontent.com/mzohaibqc/antd-amplify-react/master/images/authflow1.png?raw=true "AuthFlow")
```
<SignIn />
```
![SignIn](https://raw.githubusercontent.com/mzohaibqc/antd-amplify-react/master/images/SignIn.PNG?raw=true "SignIn")
```
<ResetPassword />
```
![ResetPassword](https://raw.githubusercontent.com/mzohaibqc/antd-amplify-react/master/images/reset.png?raw=true "ResetPassword")

