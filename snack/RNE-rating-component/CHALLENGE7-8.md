Saved Snack: https://snack.expo.dev/@eshoogland/rne-rating-component

Challenge 7 — What I changed

I experimented with React Native layout props across the app. I used `flexDirection` and `alignItems` in `section` to stack and center the rating controls, used `alignSelf: 'stretch'` on the Card to make it expand horizontally, and set `width: '60%'` on the submit button wrapper to control its size. I also adjusted `margin` and `padding` values to space items and added a light background color to the container to make the card stand out.

Challenge 8 — Reflection

I tried `flexDirection: 'column'` and `alignItems: 'center'` to center components vertically within each section. I learned that `alignSelf` can override parent alignment for individual children (useful for stretching or aligning a single child differently). Changing `width` and `margin` is often the simplest way to size and position elements when precise control is needed; flexbox is excellent for distributing space but explicit widths are helpful when you want predictable sizing.

Further experiments I recommend: use `flex: 1` on child elements to see how they expand, and mix percentage `width` with `padding` to build responsive layouts.

Expo has an interesting Flex example that highlights that flexDirection in React Native defaults to column rather than row.
