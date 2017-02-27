# Mobile Developer Coding Challenge

This is my implementation of the 500px mobile challenge, done in React Native.

Here are some views of my final product:

Android Image View         |  Android Grid View
:-------------------------:|:-------------------------:
![][android-image]         |  ![][android-grid]

iPhone Image View          | iPhone Grid View
:-------------------------:|:-------------------------:
![][iphone-image]          |  ![][iphone-grid]

[iphone-image]: https://github.com/evancloutier/mobile-challenge/blob/master/gifs/iphone-mobile-challenge-display-image.gif
[iphone-grid]: https://github.com/evancloutier/mobile-challenge/blob/master/gifs/iphone-mobile-challenge-grid-view.gif
[android-image]: https://github.com/evancloutier/mobile-challenge/blob/master/gifs/android-mobile-challenge-image-view.gif
[android-grid]: https://github.com/evancloutier/mobile-challenge/blob/master/gifs/android-mobile-challenge-grid-view.gif

## Features

- [ ] Navigation stack handled using the new(er) [React Navigation](www.reactnavigation.org) library
- [ ] Pull to refresh on the grid
- [ ] Grid handles both portrait and landscape views
- [ ] Pagination on grid and full screen photo views

## Why React Native?

### Maintaining One Codebase

This is the main reason I chose to do this challenge in React Native. Although this challenge is miniature compared to the 500px production apps, the design trade-offs become more visible as the scope grows. The maintainability of this challenge is evidently better than adapting and updating two codebases. Not only does this make things simpler, but it also saves a lot of time and ultimately money.

### Services Oriented

Another thing to consider is that the mobile apps for 500px as they currently stand appear to be very services oriented. What do I mean by that? The 500px app is made for posting already-edited photos, and viewing photos posted by other photographers. As far as I know (you can totally call me out on this - I would love to have a discussion about it) endpoints are being consumed for a variety of features in both apps. Why not just have one codebase that does the same thing across both platforms with minimal, if any, difference in the overall makeup of the apps?

### Trying Something New

I've never gone end-to-end with a set purpose with React Native before. I figured this would be a great time to do so and learn along the way.

## Did I Learn Anything?

Yes, a lot.

When I first started building the app, I decided not to use a state machine (ie. Redux) because I figured there wouldn't be many states within the app and I could live without it. While this is true, using Redux would have made my life a lot easier when dealing with components and passing information to and from views. I found myself jumping through a lot of hoops, which at the end of the day isn't what I want to do. I didn't end up completing one of the goals requested in the challenge - retaining the index when returning from the full screen image view to the grid. I think using Redux would solve this problem, as I could use dispatchers and actions to communicate between the two components in a more seamless way.

### Improvements

- [ ] Incorporating Redux to make state management more manageable.
- [ ] Displaying more photo information on the image screen, possibly via a modal that appears when an information button is clicked - similar to what is done in the production app.
- [ ] Refining the row building logic to handle more than two photos per row.
