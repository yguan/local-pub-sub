# Local PubSub
local-pub-sub.js is a pubsub library that is built on top of localStorage.

## Demo

## Development

#### Overview of Folder Structure

* `src` contains the pre-build files of local-pub-sub.js.
* `gulp` contains the gulp task files.

#### Anatomy of Local PubSub

Here is the overview for the files under `src` folder:

* `index.js` is the entry point of local-pub-sub.js.
* `pub-sub.js` is a simple same window pubsub implementation.

#### Set up The Local Environment

Here are the steps:

* Install `gulp` globally if you haven't done so.
* Run `npm install`.
* Run `gulp` to build the `local-pub-sub.js`.

## Usage

``` javascript
localPubSub.subscribe('some-key', function (info) {
    console.log(info);
});

localPubSub.publish('some-key, {price: 23});
```

## License

[MIT](http://opensource.org/licenses/MIT)