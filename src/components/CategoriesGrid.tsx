import { Card } from './ui/card';

const categories = [
  { name: 'Textbooks', icon: '📚', color: 'bg-blue-100 dark:bg-blue-900/30', iconBg: 'bg-blue-500' },
  { name: 'Electronics', icon: '💻', color: 'bg-green-100 dark:bg-green-900/30', iconBg: 'bg-green-500' },
  { name: 'Clothes', icon: '👕', color: 'bg-yellow-100 dark:bg-yellow-900/30', iconBg: 'bg-yellow-500' },
  { name: 'Services', icon: '👨‍🏫', color: 'bg-purple-100 dark:bg-purple-900/30', iconBg: 'bg-purple-500' },
  { name: 'Furniture', icon: '🪑', color: 'bg-pink-100 dark:bg-pink-900/30', iconBg: 'bg-pink-500' },
  { name: 'Sports', icon: '⚽', color: 'bg-indigo-100 dark:bg-indigo-900/30', iconBg: 'bg-indigo-500' }
];

export function CategoriesGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Browse Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className="group cursor-pointer bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-10 h-10 ${category.iconBg} rounded-xl flex items-center justify-center`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                </div>
                <span className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}