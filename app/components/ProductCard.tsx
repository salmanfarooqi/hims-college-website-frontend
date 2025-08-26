'use client'

import { motion } from 'framer-motion'
import { Star, ShoppingCart, Eye, Truck, Shield, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    name: string
    description: string
    originalPrice: number
    salePrice: number
    rating: number
    imageUrl: string
    features: string[]
    badges?: string[]
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-1 shadow-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-bold text-gray-900">{product.rating}</span>
        </div>

        {/* Trending Badge */}
        {product.badges?.includes('trending') && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            🔥 Trending
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Product Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {product.name}
        </h3>

        {/* Product Description */}
        <div 
          className="text-gray-600 mb-4 leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {/* Features List */}
        <div className="mb-4">
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl font-bold text-green-600">Rs {product.salePrice.toLocaleString()}</span>
          <span className="text-lg text-gray-400 line-through">Rs {product.originalPrice.toLocaleString()}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group-hover:scale-105">
            <ShoppingCart className="w-4 h-4" />
            <span>Shop Now / شاپ کریں</span>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group-hover:scale-105">
            <Eye className="w-4 h-4" />
            <span>View Details / تفصیلات دیکھیں</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-green-600">
              <Truck className="w-4 h-4" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">24/7 Support</span>
              <span className="text-gray-500">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard 