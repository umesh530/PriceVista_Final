# 360° Immersive Product Viewer

This project now includes an enhanced 360-degree product viewer that allows users to explore products from every angle.

## Features

✅ **360° Rotation**: Drag or swipe to rotate products left/right  
✅ **Auto-rotation**: Optional automatic rotation on load  
✅ **Zoom Controls**: Zoom in/out for detailed viewing  
✅ **Theme Support**: Works with both light and dark themes  
✅ **Fallback Handling**: Shows normal image if 360° images aren't available  
✅ **Responsive Design**: Optimized for mobile, tablet, and desktop  
✅ **Smooth Animations**: Framer Motion animations for loading and transitions  
✅ **Accessibility**: Alt text, keyboard support, and ARIA labels  
✅ **Full-screen Mode**: Immersive viewing experience  
✅ **Loading Spinner**: Visual feedback while images load  

## How to Use

### 1. Generate 360° Images

1. Open `public/generate-360-images.html` in your browser
2. Enter the product ID (e.g., "laptop", "phone", "camera")
3. Set the number of images (recommended: 36 for smooth rotation)
4. Click "Generate Images" and wait for completion
5. Click "Download All" to save the images
6. Move the downloaded images to `public/products/360/` folder

### 2. Image Naming Convention

Images should follow this pattern:
```
public/products/360/
├── laptop-1.jpg
├── laptop-2.jpg
├── laptop-3.jpg
...
└── laptop-36.jpg
```

### 3. Integration

The ImmersiveViewer is automatically included in the ProductDetail page:

```jsx
<ImmersiveViewer product={product} productId={product.id} />
```

## Component Props

| Prop | Type | Description |
|------|------|-------------|
| `product` | Object | Product object with name, image, etc. |
| `productId` | String | Unique identifier for loading 360° images |

## Controls

- **Drag/Swipe**: Rotate the product
- **Mouse Wheel**: Zoom in/out
- **Auto-rotate Button**: Toggle automatic rotation
- **Reset Button**: Return to original view
- **Zoom Buttons**: Manual zoom controls
- **Full-screen Button**: Enter immersive mode

## Fallback Behavior

If 360° images are not available for a product:
- Shows a standard product image
- Displays a message indicating 360° view is not available
- Maintains all styling and theme support

## Technical Implementation

- **Canvas-based rendering** for smooth performance
- **Touch and mouse event handling** for cross-device compatibility
- **RequestAnimationFrame** for smooth auto-rotation
- **Image preloading** for seamless transitions
- **Responsive canvas sizing** for different screen sizes

## Customization

### Styling
The component uses Tailwind CSS classes and supports both light and dark themes through the ThemeContext.

### Animation
Framer Motion animations can be customized by modifying the motion components in the JSX.

### Image Loading
Modify the image path generation logic in the `useEffect` hook to match your image naming convention.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Touch support included

## Performance Tips

1. **Optimize images**: Use compressed JPEGs (800x600px recommended)
2. **Limit image count**: 36 images provide smooth rotation
3. **Preload images**: Consider preloading for faster transitions
4. **Lazy loading**: Images load on-demand for better performance

## Troubleshooting

### Images not loading?
- Check the file path: `public/products/360/productId-1.jpg`
- Verify image format: JPEG recommended
- Check browser console for errors

### Performance issues?
- Reduce image count (try 24 instead of 36)
- Compress images further
- Check image dimensions (keep under 1000px)

### Touch not working?
- Ensure touch events are enabled
- Test on actual mobile device
- Check for CSS conflicts

## Future Enhancements

- [ ] Vertical rotation support
- [ ] Hotspot annotations
- [ ] VR mode support
- [ ] Image compression optimization
- [ ] Multiple product variants
- [ ] Analytics tracking
