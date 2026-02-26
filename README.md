# Readify - E-Book Store

A modern, professional, and fully responsive e-commerce website for purchasing e-books, built with React.js and Tailwind CSS.

## Features

- 🏠 **Home Page** - Hero section with featured books
- 🛍️ **Shop Page** - Browse all books with category filters and search
- 📖 **Book Details Page** - Detailed book information
- 🛒 **Shopping Cart** - Add/remove items, update quantities
- 💳 **Checkout** - Razorpay payment integration (test mode)
- ✅ **Success Page** - Order confirmation
- 🔐 **Login/Register** - Authentication UI (frontend only)
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- 💾 **LocalStorage** - Cart persistence across sessions
- 🔔 **Toast Notifications** - User feedback for actions

## Tech Stack

- **React.js** - Frontend framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Context API** - State management
- **React Hot Toast** - Notifications
- **Razorpay** - Payment gateway (test mode)
- **Vite** - Build tool

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

## Build for Production

```bash
npm run build
```

## Project Structure

```
readify-ebook-store/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── BookCard.jsx
│   │   ├── CartItem.jsx
│   │   └── Loader.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── BookDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Success.jsx
│   │   └── Login.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── books.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Features Breakdown

### Home Page
- Eye-catching hero section
- Featured books showcase
- Category browsing
- Statistics section

### Shop Page
- All books display
- Filter by category
- Search functionality
- Responsive grid layout

### Book Details
- Large book image
- Complete description
- Author information
- Related books section
- Add to cart / Buy now options

### Shopping Cart
- List of added items
- Quantity controls
- Remove items
- Order summary
- LocalStorage persistence

### Checkout
- Order summary
- Razorpay integration
- Test payment mode
- Responsive design

### Payment Integration

Razorpay test mode is integrated. When users click "Pay with Razorpay", a popup opens with test payment options.

**Test Mode Details:**
- Uses test API key: `rzp_test_xxxxxxxxx`
- Any test card details can be used
- No actual payment is processed

### State Management

Uses React Context API for:
- Cart management
- Add/remove items
- Update quantities
- Calculate totals
- LocalStorage sync

## Customization

### Update Razorpay Key

Replace the test key in `src/pages/Checkout.jsx`:

```javascript
const options = {
  key: 'YOUR_RAZORPAY_KEY', // Replace with your key
  // ... other options
};
```

### Add More Books

Edit `src/data/books.json` to add more books:

```json
{
  "id": 13,
  "title": "Your Book Title",
  "author": "Author Name",
  "price": 299,
  "category": "Category",
  "image": "image-url",
  "description": "Book description",
  "rating": 4.5,
  "pages": 320
}
```

### Change Colors

Edit `tailwind.config.js` to change the primary color:

```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a frontend-only implementation
- No backend or database is included
- Payment integration is in test mode
- Authentication is UI only (no actual auth)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Author

Readify E-Book Store - 2026
