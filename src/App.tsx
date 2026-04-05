import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Blogs } from './pages/Blogs';
import { Podcasts } from './pages/Podcasts';
import { Post } from './pages/Post';
import { About } from './pages/About';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}
