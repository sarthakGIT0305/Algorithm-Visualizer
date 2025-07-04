# Algorithm Visualizer 🧠

An interactive web application that brings computer science algorithms to life through real-time visual demonstrations. Built with React and modern web technologies, this tool provides an engaging way to understand and explore sorting algorithms, graph traversals, and tree operations.

## 🔗 [**Live Demo**](https://algorithm-visualizer-kappa-two.vercel.app/)

Experience the visualizer in action! Click the link above to interact with sorting algorithms in real-time.

## 🚀 Features

### Sorting Algorithms
- **Bubble Sort**: Watch elements bubble up through comparisons
- **Insertion Sort**: See how elements are inserted into their correct positions
- **Merge Sort**: Visualize the divide-and-conquer approach
- **Quick Sort**: Observe partitioning and recursive sorting

### Interactive Controls
- **Dynamic Array Generation**: Create arrays of varying sizes (1-100 elements)
- **Speed Control**: Adjust animation speed from 10ms to 1000ms
- **Real-time Visualization**: See live array transformations
- **Highlight Effects**: Visual feedback for active comparisons
- **Array Comparison**: Side-by-side view of original vs. current state

### Graph Algorithms (Coming Soon)
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Dijkstra's Shortest Path
- A* Search Algorithm

### Tree Operations (Coming Soon)
- Binary Search Trees (BST)
- AVL Tree Operations
- Tree Traversal Algorithms

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0, React Router DOM 7.6.2
- **Build Tool**: Vite 7.0.0
- **Styling**: Custom CSS with responsive design
- **Development**: ESLint, Hot Module Replacement
- **Deployment**: Optimized for Vercel deployment

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarthakGIT0305/Algorithm-Visualizer.git
   cd Algorithm-Visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 Usage

1. **Navigate to [Live Demo](https://algorithm-visualizer-kappa-two.vercel.app/)**
2. **Select Algorithm**: Choose from Bubble Sort, Insertion Sort, Merge Sort, or Quick Sort
3. **Configure Array**: Adjust array length (1-100 elements) using the slider
4. **Set Speed**: Control animation speed (10ms-1000ms) for optimal viewing
5. **Generate Array**: Create a new random array with current settings
6. **Visualize**: Click "Sort" to watch the algorithm transform the array
7. **Monitor Progress**: Compare original vs. current array states in real-time
8. **Explore**: Use navigation tabs to visit upcoming Graph and Tree sections

## 🏗️ Project Structure

```
Algorithm-Visualizer/
├── public/
├── src/
│   ├── algorithms/
│   │   └── sorting/
│   │       ├── bubbleSort.jsx
│   │       ├── insertionSort.jsx
│   │       ├── mergeSort.jsx
│   │       └── quickSort.jsx
│   ├── components/
│   │   ├── SortingVisualizer.jsx
│   │   ├── GraphVisualizer.jsx
│   │   ├── TreeVisualizer.jsx
│   │   ├── TopHeaderFiles.jsx
│   │   └── BottomFooterFiles.jsx
│   ├── styles/
│   │   └── mainStyles.css
│   ├── assets/
│   │   └── mainIconBirb.svg
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design Features

- **Responsive Layout**: Adapts to different screen sizes
- **Modern UI**: Clean, intuitive interface with custom styling
- **Color-coded Visualization**: Different colors for active comparisons
- **Smooth Animations**: Configurable animation speeds
- **Professional Branding**: Custom logo and consistent theming

## 🔧 Algorithm Implementations

### Sorting Algorithms
Each sorting algorithm is implemented with:
- **Asynchronous execution** for smooth animations
- **State management** for real-time UI updates
- **Configurable delays** for speed control
- **Visual highlighting** for active operations

### Performance Considerations
- **Time Complexity**: All algorithms maintain their theoretical complexities
- **Space Efficiency**: Optimized for browser performance
- **Animation Smoothness**: Balanced between visual clarity and performance

## 🚀 Deployment

The application is live and optimized for production:

- **✅ Live on Vercel**: [algorithm-visualizer-kappa-two.vercel.app](https://algorithm-visualizer-kappa-two.vercel.app/)
- **⚡ Fast Loading**: Optimized build with Vite
- **📱 Mobile Responsive**: Works across all device sizes
- **🌐 Global CDN**: Fast access worldwide

### Deploy Your Own
- **Vercel**: Zero-configuration deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting option

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **ESLint Configuration**: Modern JavaScript standards
- **Component Architecture**: Modular, reusable components
- **Clean Code**: Consistent naming and structure
- **Performance**: Optimized rendering and state management

## 🎓 Educational Value

This visualizer serves as an educational tool for:
- **Computer Science Students**: Understanding algorithm mechanics
- **Interview Preparation**: Visualizing common algorithmic concepts
- **Teaching**: Demonstrating algorithms in classrooms
- **Self-Learning**: Interactive exploration of data structures

## 🔮 Future Enhancements

- **Graph Algorithms**: Complete implementation of BFS, DFS, Dijkstra, A*
- **Tree Operations**: BST, AVL tree visualizations
- **Advanced Sorting**: Heap sort, radix sort, counting sort
- **Interactive Graph Builder**: User-defined graph creation
- **Algorithm Comparison**: Side-by-side performance analysis
- **Mobile Optimization**: Enhanced touch interface
- **Audio Feedback**: Sound-based algorithm representation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sarthak Gupta**
- GitHub: [@sarthakGIT0305](https://github.com/sarthakGIT0305)
- Email: sarthakgupta0305@gmail.com
- LinkedIn: [Connect with me](https://linkedin.com/in/sarthakgupta0305)

## 🙏 Acknowledgments

- Inspired by the need for interactive algorithm education
- Built with modern React ecosystem
- Deployed using Vercel's excellent platform
- UI/UX influenced by contemporary web design trends

---

*Built with ❤️ using React & Vite*
