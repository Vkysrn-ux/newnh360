import React, { useState } from 'react';
import ProductFormTabs from '../../components/admin/ProductFormTabs';
import ProductLivePreview from '../../components/admin/ProductLivePreview';

export default function ProductFormModal({ product, onClose, onSave }) {
  const [formState, setFormState] = useState(product || {
    name: '',
    subtitle: '',
    price: '',
    category: '',
    discount: '',
    images: [],
    video: '',
    features: [],
    benefits: [],
    certifications: [],
    technology: [],
    suitableFor: [],
    careInstructions: [],
    whyChoose: [],
    specifications: {},
    description: '',
  });
  const [saving, setSaving] = useState(false);

  const handleFormChange = (changes) => {
    setFormState(prev => ({ ...prev, ...changes }));
  };

  const handleSave = async () => {
    setSaving(true);
    // 1. Save product (create or update)
    const method = product ? 'PUT' : 'POST';
    const res = await fetch('/api/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });
    const saved = await res.json();
    const productId = saved.product?.id || saved.id;

    // 2. Upload images if any are new (File objects)
    const imageFiles = formState.images.filter(img => img instanceof File);
    let imageUrls = formState.images.filter(img => typeof img === 'string');
    if (imageFiles.length) {
      const fd = new FormData();
      fd.append('productId', productId);
      fd.append('type', 'image');
      imageFiles.forEach(f => fd.append('files', f));
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd });
      const { urls } = await uploadRes.json();
      imageUrls = [...imageUrls, ...urls];
    }

    // 3. Upload video if new
    let videoUrl = formState.video;
    if (formState.video && formState.video instanceof File) {
      const fd = new FormData();
      fd.append('productId', productId);
      fd.append('type', 'video');
      fd.append('files', formState.video);
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd });
      const { urls } = await uploadRes.json();
      videoUrl = urls[0];
    }

    // 4. Update product with media URLs if needed
    if (imageFiles.length || (formState.video && formState.video instanceof File)) {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          id: productId,
          images: imageUrls,
          video: videoUrl,
        }),
      });
    }

    setSaving(false);
    onSave({ ...formState, id: productId, images: imageUrls, video: videoUrl });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-6xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold">{product ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="btn btn-sm btn-secondary">Close</button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Form */}
          <div className="w-1/2 p-6 overflow-y-auto border-r">
            <ProductFormTabs value={formState} onChange={handleFormChange} />
            <div className="mt-6 flex justify-end">
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
          {/* Right: Live Preview */}
          <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
            <ProductLivePreview product={formState} />
          </div>
        </div>
      </div>
    </div>
  );
} 