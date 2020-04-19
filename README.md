### 🙋‍♂️ Made by [@koenbrouwer](https://twitter.com/KoenBrouwer).
---

# Welcome to react-grapple 👋
[![Version](https://img.shields.io/npm/v/react-grapple.svg)](https://www.npmjs.com/package/react-grapple)

A collection of useful hooks that I made. This is a [Node.js](https://nodejs.org/en/) package available through the [npm registry](https://nodejs.org/en/).
Installation into your project is done with the [`npm install` command](https://docs.npmjs.com/downloading-and-installing-packages-locally). 

# Install
```sh
npm install --save @koenbrouwer/react-usetoggle
```

# Usage

### useToggle
```js
const [state, toggleState] = useToggle(); // defaults to false
```
    
You can also give it another default initial state:

```js
const [state, toggleState] = useToggle(true); // defaults to true
```
    
If you don't give it a default value, it will default to `false`, or the boolean you feed it.
And then`toggleState()` will toggle the value from `true` to `false`, or `false` to `true`.

### useConditionalByTime

I was recently at a conference where the website would still sell tickets after the event had already ended.
That's of course bad practice. It would be much better to show some video recordings from the event or maybe
a list of upcoming events. So to automate this, you can use the `useConditionalByTime` hook.
(If you know a better name for this hook, let me know [@KoenBrouwer](https://twitter.com/KoenBrouwer))

```typescript
const [Before, After] = useConditionalByTime(date, realtime); // date is of type Date, realtime is a boolean
```
    
You can pass a `Date` object as the first argument. The hook then returns two new components in an array,
which you can use to wrap your components to be displayed before the splitDate and after. Because of array
destructuring, you can use your own names for those components, but for the sake of simplicity, we just used `Before` and `After` here.

You can pass `true` as the second argument if you want the hook to actively keep track of time and rerender realtime.

Here's an example for your awesome event landing page: 
    
```typescript jsx
import React from "react";

const App: React.FC = () => {
    const eventStartDate = new Date("2020-04-30 14:00");
    const [Before, After] = useConditionalByTime(eventStartDate, true);

    return (
        <div className="App">
            <h1>React Live, Amsterdam 2020</h1>

            <Before>
                <p>
                    Buy your tickets to this event now!
                </p>

                <BuyTickets />
            </Before>
            <After>
                <p>
                    Wow, that was an awesome conference! Take a look at our schedule for next year!
                </p>
                
                <Schedule />
            </After>
        </div>
    );
}
```

So, everything inside `<Before>` will be rendered if the date is in the future, and everything inside `<After>` is rendered if the date is in the past.
Because we've passed `true` as the second argument of the `useConditionalByTime` hook, the page gets rerendered automatically once the date passes.

### useInput

Handling change events on input fields is always a tedious process. Not with the `useInput` hook and easy binding.

```jsx
const field = useInput(initialValue); // initial value is always a string.
```

For now only text inputs are supported. Checkboxes, radios, selects and more might be added in a future version, once I feel like I need them. Or open a [pull request](https://github.com/KoenBrouwer/react-grapple/pulls) if you have a solution.
Anyway, just define the fields for your form like this:

```jsx
const name = useInput("");
const city = useInput("");
const country = useInput("Netherlands");
```

And then bind the value and change handler to your input element like this:

```html
<input type="text" {...name.bind} />
<input type="text" {...city.bind} />
<input type="text" {...country.bind} />
```

On an `<input>`, `bind` will just pass a `value` and `onChange` to the input, and will handle changes for you.
You can reference the value of the input like this:

```js
name.value // returns the value for this field
```
    
Some other useful methods you can call on the result of `useInput()`:

- `clear()` sets the value of the field to `""`.
- `setValue()` sets the value of the field to whatever you pass to it, if you ever need to set the value manually.

# Author

👤 **Koen Brouwer**

* Website: [KoenBrouwer.com](http://www.koenbrouwer.com/)
* Twitter: [@KoenBrouwer](https://twitter.com/KoenBrouwer)
* Github: [@KoenBrouwer](https://github.com/KoenBrouwer)

# 🤝 Contributing

Feel free open an issue on the [issues page](https://github.com/KoenBrouwer/react-grapple/issues) or a pull request in the [repo on GitHub](https://github.com/KoenBrouwer/react-grapple/pulls)!

# Show your support

Give a ⭐️ if this project helped you!

# License

[MIT](https://en.wikipedia.org/wiki/MIT_License)

Contributions, issues and feature requests are welcome!
