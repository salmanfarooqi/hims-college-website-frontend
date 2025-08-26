'use client'

import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'

const ProductsPage = () => {
  const products = [
    {
      name: "Silver Crest Chopper (2025 Model) – 3L, 800W Motor, 3-Speed Control",
      description: `<p>Upgrade your kitchen with the <strong>Silver Crest Chopper (2025 Model)</strong>, built for efficiency and durability. With a <strong>powerful 800W motor</strong> and a <strong>large 3-liter capacity</strong>, it handles everything from vegetables to meat with ease. Featuring <strong>4 ultra-sharp stainless steel blades</strong>, it ensures precise and fast chopping every time.</p><p>🔹 <strong>Key Features:</strong></p><ul><li><strong>800W High-Performance Motor</strong> – Strong and efficient for all chopping and grinding needs.</li><li><strong>3L Large Capacity</strong> – Perfect for families and bulk food preparation.</li><li><strong>4 Stainless Steel Blades</strong> – Sharp, durable, and designed for precision results.</li><li><strong>3 Speed Control</strong> – Adjust speed for different ingredients and textures.</li><li><strong>German-Inspired Engineering</strong> – Reliable and long-lasting performance.</li><li><strong>Lifetime Spare Parts Availability</strong> – Easy maintenance and support.</li></ul><p>📌 <strong>Note:</strong> This product comes <strong>without warranty</strong></p>`,
      originalPrice: 6000,
      salePrice: 4500,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      features: [
        "800W High-Performance Motor",
        "3L Large Capacity",
        "4 Stainless Steel Blades",
        "3 Speed Control",
        "German-Inspired Engineering",
        "Lifetime Spare Parts Availability"
      ],
      badges: ["trending"]
    },
    {
      name: "Silver Crest 2 In 1 Heavy Blender High Quality Performance Machine",
      description: `<p>Experience powerful blending and grinding with the <strong>Silver Crest 2 in 1 Heavy Blender</strong>, designed for both home and commercial use. Equipped with a <strong>strong 4500-watt motor</strong> and <strong>durable copper winding</strong>, this machine ensures high performance, long-lasting durability, and efficient results every time.</p><p><br></p><ul><li><strong>Powerful 4500W Motor</strong> – Delivers exceptional blending and grinding performance.</li><li><strong>2 in 1 Function</strong> – Ideal for both blending and grinding tasks.</li><li><strong>Copper Winding</strong> – Ensures durability, stability, and long motor life.</li><li><strong>Heavy Duty Build</strong> – Suitable for commercial use.</li></ul>`,
      originalPrice: 8000,
      salePrice: 6500,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      features: [
        "Powerful 4500W Motor",
        "2 in 1 Function",
        "Copper Winding",
        "Heavy Duty Build",
        "Commercial Grade",
        "Long-lasting Durability"
      ],
      badges: ["trending"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Products</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our high-quality kitchen appliances designed for efficiency and durability
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage 