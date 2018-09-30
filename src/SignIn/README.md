---
category: Components
type: Data Entry
title: SignIn
---

For sign in functionality, there are two components
  - **SignIn**: It's a sign in form contained in a Ant Design `Card` container
  - **SignInForm**: It's a simple Ant Design form with username and password field. You can wrapp this in any container and apply styles of your choice 


## API

### SignIn

| Property  | Description                                                                                                            | Type              | Default                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------------------- |
| title     | The label text displayed in Card title/header section.                                                                 | string\|ReactNode | `Sign in to your account`   |
| formProps | This is an object containing SignInForm props that you want to modify.                                                 | object            | `{}`                        |
| colProps  | An object containing Col props to specify columns, offset etc. [See more](http://beta.ant.design/components/grid/#Col) | object            | `{ xs: 24, sm: 12, md: 8 }` |


```html
<SignIn />
```
### SignInForm

| Property              | Description                                                  | Type   | Default                                                                                                            |
| --------------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------ |
| usernameInputProps    | username input field props                                   | object | `{ prefix: <Icon type="user" />, size: 'large', placeholder: 'Username', message: 'Please enter your username!' }` |
| passwordInputProps    | password input field props                                   | object | `{ prefix: <Icon type="lock" />, size: 'large', placeholder: 'Password', message: 'Please enter your password!' }` |
| buttonProps           | Submit button props                                          | object | `{ size: 'large', type: 'primary', label: 'Submit'}`                                                               |
| hideSignUpLink        | In order to hide SignUp link in form, add this props.        | bool   | `false`                                                                                                            |
| hideResetPasswordLink | In order to hide ResetPassword link in form, add this props. | bool   | `false`                                                                                                            |


```html
<SignInForm />
```

![SignIn](https://raw.githubusercontent.com/mzohaibqc/antd-amplify-react/master/images/SignIn.png?raw=true "SignIn")