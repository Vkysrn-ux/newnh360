import React from 'react';

export default function ProductFormFields({ fields, value, onChange }) {
  const handleChange = (key, val) => {
    onChange({ [key]: val });
  };

  return (
    <div className="space-y-4">
      {fields.map(field => {
        if (field.type === 'text' || field.type === 'number') {
          return (
            <div key={field.key}>
              <label className="block font-medium mb-1">{field.label}</label>
              <input
                type={field.type}
                className="input input-bordered w-full"
                value={value[field.key] || ''}
                required={field.required}
                onChange={e => handleChange(field.key, e.target.value)}
              />
            </div>
          );
        }
        if (field.type === 'textarea') {
          return (
            <div key={field.key}>
              <label className="block font-medium mb-1">{field.label}</label>
              <textarea
                className="input input-bordered w-full"
                value={value[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
              />
            </div>
          );
        }
        if (field.type === 'array') {
          return (
            <div key={field.key}>
              <label className="block font-medium mb-1">{field.label}</label>
              {(value[field.key] || []).map((item, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    className="input input-bordered flex-1"
                    value={item}
                    onChange={e => {
                      const arr = [...(value[field.key] || [])];
                      arr[idx] = e.target.value;
                      handleChange(field.key, arr);
                    }}
                  />
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => {
                      const arr = [...(value[field.key] || [])];
                      arr.splice(idx, 1);
                      handleChange(field.key, arr);
                    }}
                  >Remove</button>
                </div>
              ))}
              <button
                className="btn btn-sm btn-secondary mt-1"
                onClick={() => handleChange(field.key, [...(value[field.key] || []), ''])}
              >Add</button>
            </div>
          );
        }
        if (field.type === 'object') {
          return (
            <div key={field.key}>
              <label className="block font-medium mb-1">{field.label}</label>
              {Object.entries(value[field.key] || {}).map(([k, v], idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    className="input input-bordered w-1/3"
                    placeholder="Key"
                    value={k}
                    onChange={e => {
                      const obj = { ...(value[field.key] || {}) };
                      const newKey = e.target.value;
                      obj[newKey] = obj[k];
                      delete obj[k];
                      handleChange(field.key, obj);
                    }}
                  />
                  <input
                    className="input input-bordered w-1/2 ml-2"
                    placeholder="Value"
                    value={v}
                    onChange={e => {
                      const obj = { ...(value[field.key] || {}) };
                      obj[k] = e.target.value;
                      handleChange(field.key, obj);
                    }}
                  />
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => {
                      const obj = { ...(value[field.key] || {}) };
                      delete obj[k];
                      handleChange(field.key, obj);
                    }}
                  >Remove</button>
                </div>
              ))}
              <button
                className="btn btn-sm btn-secondary mt-1"
                onClick={() => handleChange(field.key, { ...(value[field.key] || {}), '': '' })}
              >Add</button>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
} 