import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/dffd4f7f-406b-4d9e-b9a9-752cf9895864', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gradient">WBOZYM</h1>
            <div className="hidden md:flex gap-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Услуги</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">О нас</button>
              <button onClick={() => scrollToSection('cases')} className="hover:text-primary transition-colors">Кейсы</button>
              <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            </div>
            <Button onClick={() => scrollToSection('contacts')} className="hidden md:flex">
              Получить консультацию
            </Button>
          </nav>
        </div>
      </header>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                <span className="text-gradient">Аудит и продвижение</span> на маркетплейсах
              </h2>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
                Профессиональный консалтинг для роста продаж на Wildberries, OZON и Яндекс.Маркет
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('contacts')}>
                  <Icon name="Rocket" className="mr-2" size={20} />
                  Заказать аудит
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('services')}>
                  <Icon name="ArrowDown" className="mr-2" size={20} />
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl gradient-orange-blue p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                    <Icon name="TrendingUp" size={40} className="mx-auto mb-2" />
                    <div className="text-2xl font-bold">+350%</div>
                    <div className="text-sm opacity-90">рост продаж</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                    <Icon name="Users" size={40} className="mx-auto mb-2" />
                    <div className="text-2xl font-bold">200+</div>
                    <div className="text-sm opacity-90">клиентов</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                    <Icon name="Award" size={40} className="mx-auto mb-2" />
                    <div className="text-2xl font-bold">5 лет</div>
                    <div className="text-sm opacity-90">на рынке</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                    <Icon name="BarChart3" size={40} className="mx-auto mb-2" />
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm opacity-90">довольных</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="ShoppingCart" className="text-primary" size={32} />
              </div>
              <p className="font-semibold">Wildberries</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                <Icon name="Package" className="text-secondary" size={32} />
              </div>
              <p className="font-semibold">OZON</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="Store" className="text-primary" size={32} />
              </div>
              <p className="font-semibold">Яндекс.Маркет</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                <Icon name="ShoppingBag" className="text-secondary" size={32} />
              </div>
              <p className="font-semibold">AliExpress</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Комплексные решения для вашего бизнеса</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Аудит карточек товаров',
                description: 'Глубокий анализ контента, фото, описаний и ключевых слов для повышения конверсии',
                icon: 'ClipboardCheck',
                features: ['Анализ конкурентов', 'SEO-оптимизация', 'Рекомендации']
              },
              {
                title: 'Продвижение товаров',
                description: 'Настройка рекламных кампаний и стратегии продвижения на маркетплейсах',
                icon: 'Megaphone',
                features: ['Настройка рекламы', 'Управление бюджетом', 'A/B тестирование']
              },
              {
                title: 'Аналитика продаж',
                description: 'Подробные отчеты, прогнозы и рекомендации на основе данных',
                icon: 'LineChart',
                features: ['Отслеживание метрик', 'Еженедельные отчеты', 'Прогнозы']
              },
              {
                title: 'Оптимизация цен',
                description: 'Стратегия ценообразования для максимизации прибыли и конкурентоспособности',
                icon: 'DollarSign',
                features: ['Анализ рынка', 'Динамическое ценообразование', 'Мониторинг конкурентов']
              },
              {
                title: 'Управление отзывами',
                description: 'Работа с репутацией, повышение рейтинга и лояльности покупателей',
                icon: 'MessageSquare',
                features: ['Мониторинг отзывов', 'Работа с негативом', 'Стимулирование']
              },
              {
                title: 'Контент для карточек',
                description: 'Создание продающих описаний, инфографики и фотографий товаров',
                icon: 'FileText',
                features: ['Копирайтинг', 'Дизайн карточек', 'Инфографика']
              }
            ].map((service, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full gradient-orange-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={service.icon as any} className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" className="text-primary" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Почему выбирают нас</h2>
              <div className="space-y-6">
                {[
                  { icon: 'Target', title: 'Результат', text: 'Средний рост продаж наших клиентов — 250% за 3 месяца' },
                  { icon: 'Brain', title: 'Экспертиза', text: 'Команда специалистов с опытом работы более 5 лет' },
                  { icon: 'Zap', title: 'Скорость', text: 'Первые результаты уже через 2 недели работы' },
                  { icon: 'Shield', title: 'Гарантии', text: 'Возврат средств, если не достигнем KPI' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl gradient-orange-blue p-1">
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center p-8">
                  <div className="text-center">
                    <Icon name="TrendingUp" className="text-primary mx-auto mb-4" size={80} />
                    <h3 className="text-3xl font-bold mb-2">Растем вместе</h3>
                    <p className="text-muted-foreground">Ваш успех — наша главная цель</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Кейсы наших клиентов</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Электроника',
                result: '+420% продаж',
                text: 'Оптимизировали карточки товаров и настроили рекламу. Продажи выросли в 5 раз за 2 месяца.',
                metrics: { views: '+350%', conversion: '+180%', revenue: '+420%' }
              },
              {
                category: 'Одежда',
                result: '+280% выручка',
                text: 'Провели полный аудит, обновили фото и описания. Рост выручки почти в 3 раза.',
                metrics: { views: '+240%', conversion: '+140%', revenue: '+280%' }
              },
              {
                category: 'Товары для дома',
                result: '+500% трафик',
                text: 'SEO-оптимизация карточек и грамотная рекламная стратегия дали взрывной рост.',
                metrics: { views: '+500%', conversion: '+220%', revenue: '+380%' }
              }
            ].map((caseItem, idx) => (
              <Card key={idx} className="bg-white hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                    {caseItem.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gradient">{caseItem.result}</h3>
                  <p className="text-muted-foreground mb-6">{caseItem.text}</p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                    <div>
                      <div className="text-sm text-muted-foreground">Просмотры</div>
                      <div className="font-bold text-primary">{caseItem.metrics.views}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Конверсия</div>
                      <div className="font-bold text-primary">{caseItem.metrics.conversion}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Выручка</div>
                      <div className="font-bold text-primary">{caseItem.metrics.revenue}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Получить консультацию</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Оставьте заявку и мы проведем бесплатный экспресс-аудит вашего магазина
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg gradient-orange-blue flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:bestlog@bk.ru" className="text-primary hover:underline">
                    bestlog@bk.ru
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg gradient-orange-blue flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Телефон</h3>
                  <a href="tel:+79999999999" className="text-primary hover:underline">
                    +7 (999) 999-99-99
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg gradient-orange-blue flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-xl">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="Gift" className="text-primary" size={20} />
                  Бесплатный экспресс-аудит
                </h4>
                <p className="text-sm text-muted-foreground">
                  При первой консультации проведем быстрый анализ вашего магазина и дадим рекомендации
                </p>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ваше имя *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Телефон *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Опишите ваш бизнес и задачи"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Получить консультацию'}
                    <Icon name="Send" className="ml-2" size={18} />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 gradient-orange-blue text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">WBOZYM</h3>
              <p className="opacity-90">Эксперты в продвижении на маркетплейсах</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 opacity-90">
                <li>Аудит карточек</li>
                <li>Продвижение</li>
                <li>Аналитика</li>
                <li>Контент</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Маркетплейсы</h4>
              <ul className="space-y-2 opacity-90">
                <li>Wildberries</li>
                <li>OZON</li>
                <li>Яндекс.Маркет</li>
                <li>AliExpress</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 opacity-90">
                <li>bestlog@bk.ru</li>
                <li>+7 (999) 999-99-99</li>
                <li>Пн-Пт: 9:00-20:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center opacity-90">
            <p>© 2024 WBOZYM. Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;