import React, { useState } from 'react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  rating: number;
  text: string;
  results?: {
    metric: string;
    value: string;
  }[];
  verified?: boolean;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  variant?: 'grid' | 'carousel' | 'featured';
  showRatings?: boolean;
  showResults?: boolean;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc',
    rating: 5,
    text: 'This product completely transformed our workflow. We\'ve saved over 20 hours per week and our team productivity has skyrocketed. The ROI was evident within the first month.',
    results: [
      { metric: 'Time Saved', value: '20 hrs/week' },
      { metric: 'ROI', value: '350%' },
    ],
    verified: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Growth Labs',
    rating: 5,
    text: 'I was skeptical at first, but the results speak for themselves. Our conversion rate increased by 127% in just 2 months. This is a game-changer for any serious business.',
    results: [
      { metric: 'Conversion Rate', value: '+127%' },
      { metric: 'Revenue Growth', value: '+$45k/mo' },
    ],
    verified: true,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'Scale Digital',
    rating: 5,
    text: 'Best investment we\'ve made this year. The customer support is exceptional, and the platform is incredibly intuitive. We\'ve already recommended it to 5 other companies.',
    results: [
      { metric: 'Cost Savings', value: '$12k/year' },
      { metric: 'Team Efficiency', value: '+85%' },
    ],
    verified: true,
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Founder',
    company: 'StartupFlow',
    rating: 5,
    text: 'As a founder wearing multiple hats, this tool has been invaluable. It\'s like having an extra team member. The automation features alone are worth 10x the price.',
    results: [
      { metric: 'Tasks Automated', value: '150+' },
      { metric: 'Time to Market', value: '-40%' },
    ],
    verified: true,
  },
  {
    id: '5',
    name: 'Jessica Williams',
    role: 'Operations Lead',
    company: 'Efficiency Co',
    rating: 5,
    text: 'We tried 3 competitors before finding this gem. The difference in quality and results is night and day. Our entire operations team is now running on this platform.',
    results: [
      { metric: 'Error Reduction', value: '-92%' },
      { metric: 'Process Speed', value: '+3x' },
    ],
    verified: true,
  },
  {
    id: '6',
    name: 'Alex Thompson',
    role: 'CTO',
    company: 'InnovateTech',
    rating: 5,
    text: 'From a technical perspective, this is brilliantly engineered. The API documentation is superb, integration was seamless, and performance has been rock-solid.',
    results: [
      { metric: 'Uptime', value: '99.98%' },
      { metric: 'Integration Time', value: '2 hours' },
    ],
    verified: true,
  },
];

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = defaultTestimonials,
  variant = 'grid',
  showRatings = true,
  showResults = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const TestimonialCard: React.FC<{ testimonial: Testimonial; featured?: boolean }> = ({
    testimonial,
    featured = false,
  }) => (
    <div
      className={`
        bg-white rounded-xl shadow-lg p-6 
        ${featured ? 'border-2 border-purple-500' : 'border border-gray-200'}
        hover:shadow-xl transition-shadow
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              {testimonial.verified && (
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {testimonial.role}
              {testimonial.company && ` at ${testimonial.company}`}
            </p>
          </div>
        </div>
      </div>

      {/* Rating */}
      {showRatings && (
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>
      )}

      {/* Testimonial Text */}
      <p className="text-gray-700 mb-4 leading-relaxed italic">
        "{testimonial.text}"
      </p>

      {/* Results */}
      {showResults && testimonial.results && testimonial.results.length > 0 && (
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
          {testimonial.results.map((result, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-purple-600">{result.value}</p>
              <p className="text-xs text-gray-600">{result.metric}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (variant === 'carousel') {
    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex(Math.min(testimonials.length - 1, activeIndex + 1))}
            disabled={activeIndex === testimonials.length - 1}
            className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    const featured = testimonials[0];
    const others = testimonials.slice(1, 4);

    return (
      <div className="space-y-6">
        <TestimonialCard testimonial={featured} featured={true} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    );
  }

  // Default grid variant
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};
