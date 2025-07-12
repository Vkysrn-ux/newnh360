import React, { useState } from 'react';
import ProductImageGallery from './ProductImageGallery';
import ProductVideoUpload from './ProductVideoUpload';
import ProductFormFields from './ProductFormFields';

const TABS = [
  { label: 'Description', key: 'description' },
  { label: 'Specifications', key: 'specifications' },
  { label: 'Benefits', key: 'benefits' },
  { label: 'Care Instructions', key: 'careInstructions' },
  { label: 'Media', key: 'media' },
];

export default function ProductFormTabs({ value, onChange }) {
  const [tab, setTab] = useState('description');

  return (
    <div>
      <div className="flex border-b mb-4">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`px-4 py-2 ${tab === t.key ? 'border-b-2 border-primary font-bold' : 'text-gray-500'}`}
            onClick={() => setTab(t.key)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>
        {tab === 'description' && (
          <div className="space-y-4">
            <ProductFormFields
              fields={[
                { label: 'Name', key: 'name', type: 'text', required: true },
                { label: 'Subtitle', key: 'subtitle', type: 'text' },
                { label: 'Category', key: 'category', type: 'text' },
                { label: 'Price', key: 'price', type: 'number', required: true },
                { label: 'Discount (%)', key: 'discount', type: 'number' },
                { label: 'Description', key: 'description', type: 'textarea' },
                { label: 'Features', key: 'features', type: 'array' },
                { label: 'Certifications', key: 'certifications', type: 'array' },
                { label: 'Technology', key: 'technology', type: 'array' },
                { label: 'Suitable For', key: 'suitableFor', type: 'array' },
                { label: 'Why Choose', key: 'whyChoose', type: 'array' },
              ]}
              value={value}
              onChange={onChange}
            />
          </div>
        )}
        {tab === 'specifications' && (
          <ProductFormFields
            fields={[
              { label: 'Specifications', key: 'specifications', type: 'object' },
            ]}
            value={value}
            onChange={onChange}
          />
        )}
        {tab === 'benefits' && (
          <ProductFormFields
            fields={[
              { label: 'Benefits', key: 'benefits', type: 'array' },
            ]}
            value={value}
            onChange={onChange}
          />
        )}
        {tab === 'careInstructions' && (
          <ProductFormFields
            fields={[
              { label: 'Care Instructions', key: 'careInstructions', type: 'array' },
            ]}
            value={value}
            onChange={onChange}
          />
        )}
        {tab === 'media' && (
          <div className="space-y-4">
            <ProductImageGallery
              images={value.images}
              onChange={imgs => onChange({ images: imgs })}
            />
            <ProductVideoUpload
              video={value.video}
              onChange={vid => onChange({ video: vid })}
            />
          </div>
        )}
      </div>
    </div>
  );
} 