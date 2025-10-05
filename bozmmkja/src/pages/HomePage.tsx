import { useEffect, useState } from 'react';
import { BookOpen, Library, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { MagazineIssue, SisterMagazine } from '../lib/database.types';

interface HomePageProps {
  onNavigate: (page: string, issueId?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [latestIssue, setLatestIssue] = useState<MagazineIssue | null>(null);
  const [featuredIssues, setFeaturedIssues] = useState<MagazineIssue[]>([]);
  const [sisterMagazines, setSisterMagazines] = useState<SisterMagazine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [latestResponse, featuredResponse, sistersResponse] = await Promise.all([
        supabase
          .from('magazine_issues')
          .select('*')
          .order('publish_date', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from('magazine_issues')
          .select('*')
          .eq('featured', true)
          .order('publish_date', { ascending: false })
          .limit(4),
        supabase
          .from('sister_magazines')
          .select('*')
          .eq('active', true)
          .order('display_order', { ascending: true })
      ]);

      if (latestResponse.data) setLatestIssue(latestResponse.data);
      if (featuredResponse.data) setFeaturedIssues(featuredResponse.data);
      if (sistersResponse.data) setSisterMagazines(sistersResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (month: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                45 Years of Excellence
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Monthly
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">
                  Literary Companion
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-urdu" dir="rtl">
                آپ کا ماہانہ ادبی ساتھی - 45 سال کی ادبی روایت
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Explore four and a half decades of rich Urdu literature, insightful articles, and cultural heritage preserved in our digital archive.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => latestIssue && onNavigate('issue', latestIssue.id)}
                  className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-red-600/40 transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  Read Latest Issue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('archive')}
                  className="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 border-2 border-gray-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Library className="w-5 h-5" />
                  Explore Archive
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {latestIssue && (
              <div className="relative group animate-slide-in">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white p-4 rounded-3xl shadow-2xl">
                  <img
                    src={latestIssue.cover_image_url}
                    alt={latestIssue.title}
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                    <p className="text-sm font-medium">Latest Issue</p>
                    <p className="text-xs">{getMonthName(latestIssue.issue_month)} {latestIssue.issue_year}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {featuredIssues.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Issues</h2>
              <p className="text-xl text-gray-600 font-urdu" dir="rtl">منتخب شمارے</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="group cursor-pointer"
                  onClick={() => onNavigate('issue', issue.id)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <img
                      src={issue.cover_image_url}
                      alt={issue.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium mb-1">{issue.title}</p>
                      <p className="text-xs opacity-90">{getMonthName(issue.issue_month)} {issue.issue_year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Our Archive</h2>
          <p className="text-xl text-gray-600 font-urdu mb-8" dir="rtl">ہمارے آرکائیو کے بارے میں</p>

          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              For 45 years, our magazine has been a beacon of Urdu literature and cultural preservation. This digital archive represents decades of thoughtful articles, creative works, and cultural commentary that have shaped generations of readers.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-urdu" dir="rtl">
              45 سالوں سے، ہمارا میگزین اردو ادب اور ثقافتی تحفظ کا مینار رہا ہے۔ یہ ڈیجیٹل آرکائیو کئی دہائیوں کے سوچے سمجھے مضامین، تخلیقی کاموں اور ثقافتی تبصروں کی نمائندگی کرتا ہے جنہوں نے قارئین کی نسلوں کو تشکیل دیا ہے۔
            </p>
          </div>
        </div>
      </section>

      {sisterMagazines.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Sister Publications</h2>
              <p className="text-xl text-gray-600 font-urdu" dir="rtl">ہمارے دیگر اشاعتیں</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {sisterMagazines.map((magazine) => (
                <a
                  key={magazine.id}
                  href={magazine.website_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-red-600"
                >
                  <img
                    src={magazine.logo_url}
                    alt={magazine.name}
                    className="w-full h-32 object-contain mb-4"
                  />
                  <h3 className="text-center text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {magazine.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
