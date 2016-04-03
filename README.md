<img src="https://raw.githubusercontent.com/jacobj/slock/master/chrome/img/logo.png" width="400">
# Slock
[Slock](http://slock.tech) is a browser extension to effortlessly provide E2E encryption on Facebook Messenger.

## Tell me more
Slock uses public key cryptography to automatically encrypt your chats on Facebook Messenger. Instead of using a random server to get your friends' public keys, it uses Facebook's Graph API! If a Facebook friend of yours installs the extension and uploads their own public key to their Facebook profile all of your chats with that particular friend will be automatically encrypted!

No private keys or passwords are ever sent over the network! All encryption and decryption is done client side!

**NOTE:** Slock is under heavy development and should be in a shippable state soon. As such, it's currently not suitable for truly secure chat.

## Installing
When completed, slock will be available in the Chrome Web Store.
Until then, you can test out the dev builds by:
- cloning the repo
- running `bower install`
- [Load the extension](https://developer.chrome.com/extensions/getstarted#unpacked) in Chrome.

## Contributing
There's tons of work to still be done! Check out the [issues](https://github.com/jacobj/slock/issues)!

## Thanks
- Thanks to Kelly Mahoney for the fantastic Slock sloth logo!
- Thanks to James Risberg @jamesrisberg for creating the majority of the project page!
