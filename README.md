# Multi Value Dictionary (CLI)

An iteractive dictionary CLI that allows multiple values per key

## Requirements

* [Node.js](https://nodejs.org/) 12 or higher
* [Git](https://git-scm.com/)
* [GitHub account](https://github.com/)

## Installation Steps

1. Clone repo
2. Run `npm run build` to build the project
3. Run `npm install -g dictionary .` to install the cli globally

## Run Instructions

You can run this CLI by running the following:
```bash
dictionary
```

Valid `Prompt Options` include:

- `KEYS`: string, Gets all the keys from the dictionary
- `MEMBERS`: string, Gets all members in key
- `ADD`: string, Adds value to key
- `REMOVE`: Removes value from key
- `REMOVEALL`: string, Removes all values in key
- `CLEAR`: string, Removes all keys and all members from the dictionary
- `KEYEXISTS`: string, Checks whether a key exists or not
- `MEMBEREXISTS`: string, Checks whether a member exists within a key
- `ALLMEMBERS`: string, Returns all the members in the dictionary
- `ITEMS`: string, Returns all keys in the dictionary and all of their members


## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
