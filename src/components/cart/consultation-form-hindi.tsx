"use client";

import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Venus } from 'lucide-react';
import { useCartTheme } from '@/contexts/cart-theme-context';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
}

interface ConsultationFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (data: FormData) => void;
}

const inputBase = "w-full px-4 py-3 rounded-xl";
const inputDefault = "border border-border focus:ring-2 focus:ring-primary focus:border-transparent";
const inputValentine = "border border-rose-200 bg-white/80 text-rose-900 placeholder:text-rose-400 focus:ring-2 focus:ring-rose-300 focus:border-rose-300";

export default function ConsultationFormHindi({ formData, setFormData, onSubmit }: ConsultationFormProps) {
  const theme = useCartTheme();
  const isValentine = theme === 'valentine';

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className={isValentine ? "rounded-2xl shadow-lg border-2 border-rose-200 bg-white/90 p-6" : "bg-card rounded-2xl shadow-lg border border-border p-6"}>
      <div className="text-center mb-6">
        <h3 className={isValentine ? "text-2xl font-bold text-rose-900 mb-2" : "text-2xl font-bold text-foreground mb-2"}>
          💫 आपकी प्रेम संबंधी जानकारी
        </h3>
        <p className={isValentine ? "text-rose-700" : "text-muted-foreground"}>
       हमें आपकी व्यक्तिगत प्रेम रिपोर्ट तैयार करने में मदद करें
        </p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={isValentine ? "block text-sm font-medium text-rose-800 mb-2" : "block text-sm font-medium text-foreground mb-2"}>
              <User className={`w-4 h-4 inline mr-2 ${isValentine ? "text-rose-500" : "text-primary"}`} />
             पूरा नाम *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`${inputBase} ${isValentine ? inputValentine : inputDefault}`}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className={isValentine ? "block text-sm font-medium text-rose-800 mb-2" : "block text-sm font-medium text-foreground mb-2"}>
              <Mail className={`w-4 h-4 inline mr-2 ${isValentine ? "text-rose-400" : "text-primary"}`} />
              ईमेल पता *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`${inputBase} ${isValentine ? inputValentine : inputDefault}`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className={isValentine ? "block text-sm font-medium text-rose-800 mb-2" : "block text-sm font-medium text-foreground mb-2"}>
              <Phone className={`w-4 h-4 inline mr-2 ${isValentine ? "text-rose-500" : "text-primary"}`} />
             फ़ोन नंबर *
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className={`${inputBase} ${isValentine ? inputValentine : inputDefault}`}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <label className={isValentine ? "block text-sm font-medium text-rose-800 mb-2" : "block text-sm font-medium text-foreground mb-2"}>
              <Calendar className={`w-4 h-4 inline mr-2 ${isValentine ? "text-rose-400" : "text-primary"}`} />
             जन्म तिथि *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={`${inputBase} ${isValentine ? inputValentine : inputDefault}`}
              required
            />
          </div>
          <div>
            <label className={isValentine ? "block text-sm font-medium text-rose-800 mb-2" : "block text-sm font-medium text-foreground mb-2"}>
              <MapPin className={`w-4 h-4 inline mr-2 ${isValentine ? "text-rose-500" : "text-primary"}`} />
            जन्म स्थान *
            </label>
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
              className={`${inputBase} ${isValentine ? inputValentine : inputDefault}`}
              placeholder="Enter your birth place"
              required
            />
          </div>
          <div>
            <label className={isValentine ? "block text-sm font-medium text-rose-800 mb-2" : "block text-sm font-medium text-foreground mb-2"}>
              <Venus className={`w-4 h-4 inline mr-2 ${isValentine ? "text-rose-500" : "text-primary"}`} />
              लिंग *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className={`${inputBase} ${isValentine ? inputValentine : inputDefault} cursor-pointer`}
              required
            >
              <option value="" disabled>Select gender</option>
              <option value="male">पुरुष</option>
              <option value="female">महिला</option>
              <option value="other">अन्य</option>
            </select>
          </div>
        </div>
        <div className="text-center pt-4">
          <p className={isValentine ? "text-sm text-rose-600" : "text-sm text-muted-foreground"}>
          💝 आपकी जानकारी सुरक्षित है और इसका उपयोग केवल आपकी व्यक्तिगत प्रेम रिपोर्ट के लिए किया जाएगा
          </p>
        </div>
      </form>
    </div>
  );
} 