---
category: Components
type: Data Entry
title: SignUp
---
## Create Account

For sign up/registration functionality, there are two components
  - **SignUp**: It's a sign up or registration form contained in a Ant Design `Card` container
  - **SignUpForm**: It's a simple Ant Design form with username and password field. You can enable a confirm password field as well. Wrap this component in any container and apply styles of your choice
  - **ConfirmSignUp**: This component will be rendered when Congnito will return a response with a challenge to confirm secret code sent to your email or phone number
  - **ConfirmsignUpForm**: A form that contains username and (secret) code fields to verify that given email belongs to one trying to sign up 


## API

### SignUp

```html
<SignUp />
```

![SignUp](https://raw.githubusercontent.com/mzohaibqc/antd-amplify-react/master/images/SignUp.png?raw=true "SignUp")

| Property  | Description                                                                                                            | Type              | Default                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------------------- |
| title     | The label text displayed in Card title/header section.                                                                 | string\|ReactNode | `Sign Up`                   |
| formProps | This is an object containing SignInForm props that you want to modify.                                                 | object            | `{}`                        |
| colProps  | An object containing Col props to specify columns, offset etc. [See more](http://beta.ant.design/components/grid/#Col) | object            | `{ xs: 24, sm: 12, md: 8 }` |



### SignUpForm

| Property           | Description                                         | Type   | Default                                                                                                                |
| ------------------ | --------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| usernameInputProps | username input field props                          | object | `{ prefix: <Icon type="user" />, size: 'large', placeholder: 'Email', message: 'Please enter your email!'}`            |
| passwordInputProps | password input field props                          | object | `{ prefix: <Icon type="lock" />, size: 'large', placeholder: 'Enter your code', message: 'Please enter secret code!'}` |
| buttonProps        | Submit button props                                 | object | `{ size: 'large', type: 'primary', label: 'Submit'}`                                                                   |
| confirmPassword    | In order to hide confirm password field, add false. | bool   | `true`                                                                                                                 |


```html
<SignUpForm />
```



### ConfirmSignUp

```html
<ConfirmSignUp />
```

![ConfirmSignUp](https://raw.githubusercontent.com/mzohaibqc/antd-amplify-react/master/images/ConfirmSignUp.png?raw=true "ConfirmSignUp")


| Property  | Description                                                                                                            | Type              | Default                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------------------- |
| title     | The label text displayed in Card title/header section.                                                                 | string\|ReactNode | `Confirm Sign Up`           |
| formProps | This is an object containing SignInForm props that you want to modify.                                                 | object            | `{}`                        |
| colProps  | An object containing Col props to specify columns, offset etc. [See more](http://beta.ant.design/components/grid/#Col) | object            | `{ xs: 24, sm: 12, md: 8 }` |

### ConfirmSignUpForm

```html
<ConfirmSignUpForm />
```

| Property                  | Description                                         | Type   | Default                                                                                                            |
| ------------------------- | --------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| usernameInputProps        | username input field props                          | object | `{ prefix: <Icon type="user" />, size: 'large', placeholder: 'Email', message: 'Please enter your email!'}`        |
| passwordInputProps        | password input field props                          | object | `{ prefix: <Icon type="lock" />, size: 'large', placeholder: 'Password', message: 'Please enter your password!'}`  |
| confirmPasswordInputProps | confirm password input field props                  | object | `{ prefix: <Icon type="lock" />, size: 'large', placeholder: 'Confirm', message: 'Please confirm your password!'}` |
| buttonProps               | Submit button props                                 | object | `{ size: 'large', type: 'primary', label: 'Submit'}`                                                               |
| confirmPassword           | In order to hide confirm password field, add false. | bool   | `true`                                                                                                             |

