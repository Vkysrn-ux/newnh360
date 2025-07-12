'use client';
import React, { useState, useEffect } from 'react';
import ProductFormModal from '../../components/admin/ProductFormModal';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSave = (savedProduct) => {
    setShowModal(false);
    setEditingProduct(null);
    // Refresh product list
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.category}</td>
              <td>₹{prod.price}</td>
              <td>
                {prod.images && prod.images.length > 0 && (
                  <img src={prod.images[0]} alt="" className="w-12 h-12 object-cover rounded" />
                )}
              </td>
              <td>
                <button className="btn btn-sm btn-secondary mr-2" onClick={() => handleEdit(prod)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
} 