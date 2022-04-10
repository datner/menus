import { gql, useQuery } from '@apollo/client';
import { Locale } from '@prisma/client';
import { Category } from '@generated/type-graphql';
import { useRouter } from 'next/router';

const GET_ALL_CATEGORIES = gql`
  query getAllCategories($slug: String) {
    cateogries(where: { restaurant: { is: { slug: { equals: $slug } } } }) {
      content {
        name
        description
      }
      id
      identifier
      updatedAt
      items {
        content {
          description
          name
        }
        identifier
        image
        price
      }
    }
  }
`;

function ItemList() {
  const { locale = Locale.en } = useRouter();
  const { data: categories } = useQuery<Category[]>(GET_ALL_CATEGORIES);
  return (
    <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
      {categories?.map((category) => (
        <div key={category.id} className="relative">
          <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
            <h3>
              {category.content?.find((it) => it.locale === locale)?.name}
            </h3>
          </div>
          <ul role="list" className="relative z-0 divide-y divide-gray-200">
            {category.items?.map((item) => (
              <li key={item.id}>
                <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <a href="#" className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {item.id}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {item.id}
                      </p>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
