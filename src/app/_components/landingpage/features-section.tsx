import { Search, Heart, Share2, Sparkles, Zap, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Discover & Explore",
    description: "Browse millions of high-quality images and videos tailored to your interests and creative needs.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Heart,
    title: "Save Your Favorites",
    description: "Create beautiful boards and collections to organize your inspiration for any project.",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: Share2,
    title: "Share & Collaborate",
    description: "Work together with friends, family, and teams to bring your creative visions to life.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Sparkles,
    title: "AI-Powered Search",
    description: "Find exactly what you're looking for with intelligent visual search and recommendations.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Zap,
    title: "Instant Inspiration",
    description: "Get personalized content feeds based on your interests and previous interactions.",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Users,
    title: "Join the Community",
    description: "Connect with millions of creators and discover trending ideas from around the world.",
    color: "from-green-500 to-green-600"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Create
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Powerful tools and features designed to fuel your creativity and bring your ideas to life
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
