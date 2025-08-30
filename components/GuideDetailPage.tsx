"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Star, MapPin, Calendar, Users, Clock, ChevronLeft, ChevronRight, ExternalLink, Instagram, DollarSign } from "lucide-react";
import { useState } from "react";

interface GuideDetailPageProps {
  slug: string;
  onNavigateToHostPortal?: () => void;
}

const retreatCenters = [
  {
    id: '1',
    name: 'Serenity Hills Wellness Resort',
    location: 'Ubud, Bali',
    rating: 4.9,
    reviews: 127,
    priceFrom: 180,
    priceTo: 320,
    images: [
      'https://images.unsplash.com/photo-1701355203545-5aeee300ef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJldHJlYXQlMjB3ZWxsbmVzcyUyMGNlbnRlcnxlbnwxfHx8fDE3NTU5ODQxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1728050829115-490e7a27ad81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwdmlsbGElMjBiYWxpfGVufDF8fHx8MTc1NjE0Njk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1728049006660-3106de7027d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHNwYSUyMHdlbGxuZXNzJTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NjE0Njk2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1710406941299-d61bdb76b109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjY29tbW9kYXRpb24lMjBiZWRyb29tfGVufDF8fHx8MTc1NjE0Njk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Nestled among rice terraces with stunning valley views, this luxury wellness resort features infinity pools, traditional Balinese architecture, and world-class spa facilities. Experience authentic wellness practices with daily yoga sessions, personalized meditation guidance, and holistic healing treatments.',
    capacity: 24,
    duration: '5-14 days',
    highlights: ['Infinity Pool', 'Spa Treatments', 'Valley Views', 'Yoga Pavilion'],
    type: 'Luxury Wellness'
  },
  {
    id: '2',
    name: 'Sacred Valley Yoga Retreat',
    location: 'Canggu, Bali',
    rating: 4.8,
    reviews: 89,
    priceFrom: 120,
    priceTo: 250,
    images: [
      'https://images.unsplash.com/photo-1693921148341-abb9cc11a8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHJldHJlYXQlMjBzcGFjZXxlbnwxfHx8fDE3NTU5ODQxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1703714723172-e0fa7f1ea6ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc2hhbGElMjBtZWRpdGF0aW9uJTIwaGFsbCUyMGJhbGl8ZW58MXx8fHwxNzU2MTQ2OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1744115232856-333443babe3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcmV0cmVhdCUyMGRpbmluZyUyMG9yZ2FuaWN8ZW58MXx8fHwxNzU2MTQ2OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1599043109006-fa95b3ca985d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHBlYWNlZnVsJTIwc3BhY2V8ZW58MXx8fHwxNzU2MTQ2OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Authentic yoga sanctuary surrounded by tropical gardens and rice fields. Features traditional Balinese architecture with modern amenities and world-renowned yoga instructors. The retreat includes daily vinyasa and hatha yoga classes, meditation workshops, and cultural excursions to sacred temples.',
    capacity: 16,
    duration: '7-21 days',
    highlights: ['Traditional Shala', 'Rice Terraces', 'Local Culture', 'Organic Gardens'],
    type: 'Traditional Yoga'
  },
  {
    id: '3',
    name: 'Ocean Cliff Meditation Center',
    location: 'Uluwatu, Bali',
    rating: 4.7,
    reviews: 156,
    priceFrom: 200,
    priceTo: 380,
    images: [
      'https://images.unsplash.com/photo-1726377240070-19b747fc9f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHJldHJlYXQlMjB3cml0aW5nJTIwam91cm5hbGluZ3xlbnwxfHx8fDE3NTU5ODQxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1682639585147-33e239747297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNsaWZmJTIwbWVkaXRhdGlvbiUyMHZpZXd8ZW58MXx8fHwxNzU2MTQ2OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1599043109006-fa95b3ca985d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHBlYWNlZnVsJTIwc3BhY2V8ZW58MXx8fHwxNzU2MTQ2OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1710406941299-d61bdb76b109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjY29tbW9kYXRpb24lMjBiZWRyb29tfGVufDF8fHx8MTc1NjE0Njk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Perched on dramatic limestone cliffs with panoramic ocean views. This contemporary meditation center offers silent retreats, mindfulness programs, and transformational healing experiences. Practice mindful living with guided meditation sessions and contemplative walks along cliff paths.',
    capacity: 12,
    duration: '3-10 days',
    highlights: ['Ocean Views', 'Cliff Location', 'Silent Retreats', 'Modern Design'],
    type: 'Meditation & Mindfulness'
  },
  {
    id: '4',
    name: 'Jungle Sanctuary Eco Retreat',
    location: 'Ubud, Bali',
    rating: 4.6,
    reviews: 94,
    priceFrom: 150,
    priceTo: 280,
    images: [
      'https://images.unsplash.com/photo-1670589953903-b4e2f17a70a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb29sJTIwbWluaW1hbCUyMGRlc2lnbnxlbnwxfHx8fDE3NTU2OTc5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1604466167775-de9add7fca3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjBlY28lMjByZXNvcnQlMjBiYW1ib298ZW58MXx8fHwxNzU2MTQ2OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1599174532268-a2533fc5561b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsaW5nJTIwZ2FyZGVuJTIwc2FuY3R1YXJ5JTIwaGVyYnN8ZW58MXx8fHwxNzU2MTQ2OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1710406941299-d61bdb76b109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjY29tbW9kYXRpb24lMjBiZWRyb29tfGVufDF8fHx8MTc1NjE0Njk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Sustainable eco-retreat immersed in pristine jungle surroundings. Features bamboo architecture, natural swimming pools, and comprehensive wellness programs focused on environmental harmony. Connect deeply with nature through forest bathing, permaculture workshops, and wildlife observation.',
    capacity: 20,
    duration: '5-12 days',
    highlights: ['Eco-Friendly', 'Jungle Setting', 'Natural Pools', 'Sustainability'],
    type: 'Eco Wellness'
  },
  {
    id: '5',
    name: 'Beachfront Yoga Paradise',
    location: 'Seminyak, Bali',
    rating: 4.9,
    reviews: 167,
    priceFrom: 220,
    priceTo: 450,
    images: [
      'https://images.unsplash.com/photo-1630449255710-fee6f188bad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbW9kZXJuJTIwYXJjaGl0ZWN0dXJlJTIwd2hpdGV8ZW58MXx8fHwxNzU1Njk3OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1699300172411-4dc9d9c04eb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMHNlbWlueWFrJTIwc3Vuc2V0fGVufDF8fHx8MTc1NjE0Njk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1728049006660-3106de7027d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHNwYSUyMHdlbGxuZXNzJTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NjE0Njk2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1710406941299-d61bdb76b109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjY29tbW9kYXRpb24lMjBiZWRyb29tfGVufDF8fHx8MTc1NjE0Njk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Luxury beachfront retreat with direct access to pristine white sand beaches. Features contemporary design, award-winning spa, and sunset yoga sessions on the beach. Indulge in oceanfront wellness with daily beach yoga, surfing lessons, and rejuvenating spa treatments using marine-based therapies.',
    capacity: 28,
    duration: '4-14 days',
    highlights: ['Beachfront', 'Sunset Yoga', 'Luxury Spa', 'Modern Design'],
    type: 'Luxury Beach'
  },
  {
    id: '6',
    name: 'Mountain View Ashram',
    location: 'Amed, Bali',
    rating: 4.5,
    reviews: 73,
    priceFrom: 90,
    priceTo: 180,
    images: [
      'https://images.unsplash.com/photo-1579531403068-8d6fd2b3f45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGxhbmRzY2FwZSUyMG1vdW50YWlucyUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTU4NzgyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1733767697183-a7aa3968859d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFzaHJhbSUyMHRlbXBsZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1NjE0Njk2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1599043109006-fa95b3ca985d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHBlYWNlZnVsJTIwc3BhY2V8ZW58MXx8fHwxNzU2MTQ2OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1710406941299-d61bdb76b109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjY29tbW9kYXRpb24lMjBiZWRyb29tfGVufDF8fHx8MTc1NjE0Njk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Traditional ashram experience with Mount Agung views. Offers authentic spiritual practices, vegetarian cuisine, and immersive cultural experiences with local Balinese communities. Deepen your spiritual journey with daily satsang, mantra chanting, and karma yoga service.',
    capacity: 14,
    duration: '7-28 days',
    highlights: ['Mountain Views', 'Authentic Ashram', 'Cultural Immersion', 'Traditional Practice'],
    type: 'Spiritual Ashram'
  },
  {
    id: '7',
    name: 'Healing Arts Sanctuary',
    location: 'Sidemen, Bali',
    rating: 4.8,
    reviews: 112,
    priceFrom: 160,
    priceTo: 300,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBpbmUlMjBsb2RnZSUyMG1vdW50YWlufGVufDF8fHx8MTc1NTg3ODI1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1599174532268-a2533fc5561b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsaW5nJTIwZ2FyZGVuJTIwc2FuY3R1YXJ5JTIwaGVyYnN8ZW58MXx8fHwxNzU2MTQ2OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1728049006660-3106de7027d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHNwYSUyMHdlbGxuZXNzJTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NjE0Njk2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1710406941299-d61bdb76b109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjY29tbW9kYXRpb24lMjBiZWRyb29tfGVufDF8fHx8MTc1NjE0Njk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Holistic healing center specializing in integrative wellness practices. Features therapy rooms, meditation gardens, and comprehensive programs combining yoga, healing arts, and spiritual guidance. Transform through personalized healing modalities including Reiki, sound therapy, energy healing, and bodywork.',
    capacity: 18,
    duration: '6-16 days',
    highlights: ['Healing Arts', 'Therapy Rooms', 'Garden Setting', 'Holistic Approach'],
    type: 'Healing Arts'
  },
  {
    id: '8',
    name: 'Cliffside Wellness Retreat',
    location: 'Bingin, Bali',
    rating: 4.7,
    reviews: 145,
    priceFrom: 240,
    priceTo: 420,
    images: [
      'https://images.unsplash.com/photo-1541256721793-d652dbe1fce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwc2FjcmVkJTIwdmFsbGV5fGVufDF8fHx8MTc1NTg3ODI1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1682639585147-33e239747297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNsaWZmJTIwbWVkaXRhdGlvbiUyMHZpZXd8ZW58MXx8fHwxNzU2MTQ2OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1728050829115-490e7a27ad81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwdmlsbGElMjBiYWxpfGVufDF8fHx8MTc1NjE0Njk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1710406941299-d61bdb76b109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjY29tbW9kYXRpb24lMjBiZWRyb29tfGVufDF8fHx8MTc1NjE0Njk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Dramatic cliffside retreat overlooking the Indian Ocean. Features infinity pools, world-class surf breaks, and wellness programs designed for adventure-seeking yoga practitioners. Combine adrenaline with mindfulness through surf yoga, cliff jumping meditation, and sunrise cliff-top yoga sessions.',
    capacity: 22,
    duration: '5-11 days',
    highlights: ['Cliffside Location', 'Surf Access', 'Ocean Views', 'Adventure Yoga'],
    type: 'Adventure Wellness'
  },
  {
    id: '9',
    name: 'Sacred Garden Retreat',
    location: 'Tabanan, Bali',
    rating: 4.6,
    reviews: 88,
    priceFrom: 130,
    priceTo: 240,
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpbGFuZCUyMGlzbGFuZCUyMHRyb3BpY2FsfGVufDF8fHx8MTc1NTg3ODI2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1599174532268-a2533fc5561b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsaW5nJTIwZ2FyZGVuJTIwc2FuY3R1YXJ5JTIwaGVyYnN8ZW58MXx8fHwxNzU2MTQ2OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1604466167775-de9add7fca3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjBlY28lMjByZXNvcnQlMjBiYW1ib298ZW58MXx8fHwxNzU2MTQ2OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1599043109006-fa95b3ca985d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHBlYWNlZnVsJTIwc3BhY2V8ZW58MXx8fHwxNzU2MTQ2OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Tranquil garden sanctuary surrounded by medicinal plants and healing herbs. Offers plant-based healing programs, permaculture education, and earth-connected spiritual practices. Learn ancient plant wisdom through herbal medicine workshops, garden-to-table cooking classes, and botanical walks.',
    capacity: 16,
    duration: '8-15 days',
    highlights: ['Healing Gardens', 'Plant Medicine', 'Permaculture', 'Earth Connection'],
    type: 'Plant Medicine'
  },
  {
    id: '10',
    name: 'Volcanic Peaks Retreat',
    location: 'Kintamani, Bali',
    rating: 4.4,
    reviews: 67,
    priceFrom: 110,
    priceTo: 220,
    images: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBsb2ZvdGVuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NTg3ODI1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1673671241731-bd0286830076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xjYW5pYyUyMGxha2UlMjBtb3VudGFpbiUyMHJldHJlYXR8ZW58MXx8fHwxNzU2MTQ2OTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1733767697183-a7aa3968859d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFzaHJhbSUyMHRlbXBsZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1NjE0Njk2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1599043109006-fa95b3ca985d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHBlYWNlZnVsJTIwc3BhY2V8ZW58MXx8fHwxNzU2MTQ2OTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'High-altitude retreat with volcanic lake views and cool mountain air. Features sunrise meditation sessions, highland trekking, and thermal spring therapy for deep restoration. Experience mountain wellness with early morning lake meditation, volcanic hiking adventures, and natural hot spring soaks.',
    capacity: 12,
    duration: '4-9 days',
    highlights: ['Volcanic Views', 'Highland Location', 'Thermal Springs', 'Cool Climate'],
    type: 'Mountain Retreat'
  }
];

export default function GuideDetailPage({ slug, onNavigateToHostPortal }: GuideDetailPageProps) {
  // State for carousel current slide for each retreat center
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>(
    retreatCenters.reduce((acc, center) => ({ ...acc, [center.id]: 0 }), {})
  );

  const nextSlide = (centerId: string) => {
    setCurrentSlides(prev => ({
      ...prev,
      [centerId]: (prev[centerId] + 1) % 4
    }));
  };

  const prevSlide = (centerId: string) => {
    setCurrentSlides(prev => ({
      ...prev,
      [centerId]: prev[centerId] === 0 ? 3 : prev[centerId] - 1
    }));
  };

  const goToSlide = (centerId: string, slideIndex: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [centerId]: slideIndex
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Complete Article Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-16">
            {/* Article Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl tracking-tight font-extralight">
                  10 Best Yoga Retreats in Bali
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Discover Bali's most exceptional yoga and wellness retreat centers, carefully curated for transformational experiences.
                </p>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Bali has emerged as the globe's foremost haven for yoga and wellness retreats, presenting an exquisite combination of time-honored spiritual practices, breathtaking natural landscapes, and luxurious contemporary comforts. The enchanting rice terraces of Ubud, with their vibrant green hues and serene atmosphere, serve as a sanctuary for mindfulness and self-discovery, inviting practitioners to connect deeply with themselves and the earth. Meanwhile, the idyllic and unspoiled beaches of Canggu, where the sound of waves crashing against the shore harmonizes with the gentle whispers of the wind, create a tranquil environment conducive to relaxation and rejuvenation. This Indonesian paradise not only offers an ideal setting for personal transformation and healing but also immerses visitors in a rich cultural tapestry that celebrates holistic health, encouraging a profound journey towards well-being and inner peace.
                </p>
              </div>
            </div>

       

            {/* Retreat Centers List */}
            <div className="space-y-20">
              {retreatCenters.map((center, index) => (
                <article key={center.id} className="space-y-8">
                  {/* Retreat Number & Name */}
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-4">
                      <span className="text-3xl lg:text-4xl font-extralight text-gray-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-3xl lg:text-4xl tracking-tight font-light">
                        {center.name}
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{center.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">Our rating</span>
                        <Star className="w-4 h-4 fill-current text-gray-500" />
                        <span className="font-medium text-gray-900">{center.rating}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-100">
                        {center.type}
                      </span>
                    </div>
                  </div>

                  {/* Image and Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Carousel */}
                    <div className="space-y-6">
                      <div className="relative aspect-square overflow-hidden rounded-2xl group">
                        {/* Current Image */}
                        <ImageWithFallback
                          src={center.images[currentSlides[center.id]]}
                          alt={`${center.name} - Image ${currentSlides[center.id] + 1}`}
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                        
                        {/* Navigation Buttons */}
                        <button
                          onClick={() => prevSlide(center.id)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-900" />
                        </button>
                        
                        <button
                          onClick={() => nextSlide(center.id)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-900" />
                        </button>
                        
                        {/* Slide Indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {center.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToSlide(center.id, index)}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                currentSlides[center.id] === index
                                  ? 'bg-white w-6'
                                  : 'bg-white/60 hover:bg-white/80'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {center.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-100"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {center.description}
                      </p>
                      
                      {/* Key Info Grid */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Duration</span>
                          </div>
                          <p className="font-medium">{center.duration}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span>Price Range</span>
                          </div>
                          <p className="font-medium">${center.priceFrom}–${center.priceTo} /night</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 flex flex-row lg:flex-col gap-3">
                        <button className="flex-1 lg:w-full border border-gray-200 bg-white text-gray-900 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors font-medium tracking-tight flex items-center justify-center gap-2">
                          Website
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="flex-1 lg:w-full border border-gray-200 bg-white text-gray-900 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors font-medium tracking-tight flex items-center justify-center gap-2">
                          Instagram
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-6 py-16 border-t border-gray-100">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl tracking-tight font-light">
                  Ready to List Your Retreat Center?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Join our curated network of premium wellness destinations and connect with yoga professionals seeking transformational retreat experiences.
                </p>
              </div>
              
              <button 
                onClick={onNavigateToHostPortal}
                className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-medium tracking-tight inline-flex items-center gap-2"
              >
                Become a Host
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}