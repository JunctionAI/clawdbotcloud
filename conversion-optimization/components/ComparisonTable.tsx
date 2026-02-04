import React from 'react';

export interface ComparisonPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  popular?: boolean;
  features: {
    name: string;
    included: boolean | string;
  }[];
  cta: {
    text: string;
    onClick: () => void;
  };
}

interface ComparisonTableProps {
  plans: ComparisonPlan[];
  features?: string[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ plans, features }) => {
  const allFeatures = features || [
    ...new Set(plans.flatMap(plan => plan.features.map(f => f.name))),
  ];

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative bg-white rounded-lg p-6 shadow-lg
                ${plan.popular ? 'border-2 border-purple-500' : 'border border-gray-200'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">/{plan.period}</span>}
                </div>
                <button
                  onClick={plan.cta.onClick}
                  className={`
                    w-full py-3 rounded-lg font-bold transition-all
                    ${plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}
                >
                  {plan.cta.text}
                </button>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    {typeof feature.included === 'boolean' ? (
                      feature.included ? (
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{feature.name}</p>
                      {typeof feature.included === 'string' && (
                        <p className="text-xs text-gray-500">{feature.included}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 py-4 px-6 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                  Features
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={`
                      w-1/4 py-4 px-6 text-center relative
                      ${plan.popular ? 'bg-purple-50 border-x-2 border-t-2 border-purple-500' : 'bg-gray-50 border-l border-gray-200'}
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          MOST POPULAR
                        </span>
                      </div>
                    )}
                    <div className="text-xl font-bold text-gray-900 mb-2">{plan.name}</div>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="text-gray-600 text-sm">/{plan.period}</span>}
                    </div>
                    <button
                      onClick={plan.cta.onClick}
                      className={`
                        w-full py-2 rounded-lg font-semibold transition-all text-sm
                        ${plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                        }
                      `}
                    >
                      {plan.cta.text}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((featureName, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                    {featureName}
                  </td>
                  {plans.map((plan) => {
                    const feature = plan.features.find(f => f.name === featureName);
                    const included = feature?.included ?? false;

                    return (
                      <td
                        key={plan.id}
                        className={`
                          py-4 px-6 text-center
                          ${plan.popular ? 'bg-purple-50 border-x-2 border-purple-500' : 'border-l border-gray-200'}
                        `}
                      >
                        {typeof included === 'boolean' ? (
                          included ? (
                            <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )
                        ) : (
                          <span className="text-sm text-gray-700 font-medium">{included}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
