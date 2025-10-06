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
      const response = await fetch('/api/send-email', {
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
            <h1 className="text-2xl font-bold text-gradient">ЦЕТ'S GO!</h1>
            <div className="hidden md:flex gap-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('tours')} className="hover:text-primary transition-colors">Туры</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">О нас</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-primary transition-colors">Отзывы</button>
              <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            </div>
            <Button onClick={() => scrollToSection('contacts')} className="hidden md:flex">
              Связаться
            </Button>
          </nav>
        </div>
      </header>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">Приключения</span> начинаются здесь
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            Откройте мир незабываемых путешествий с нашим туристическим агентством
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('tours')}>
              <Icon name="Compass" className="mr-2" size={20} />
              Выбрать тур
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('contacts')}>
              <Icon name="Phone" className="mr-2" size={20} />
              Консультация
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-orange-blue text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-base opacity-90">Довольных туристов</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Стран мира</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10</div>
              <div className="text-sm md:text-base opacity-90">Лет опыта</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-sm md:text-base opacity-90">Гарантия качества</div>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Популярные направления</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выберите свое идеальное путешествие</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Пляжный отдых',
                description: 'Райские острова, белый песок, лазурное море',
                icon: 'Palmtree',
                price: 'от 50 000 ₽'
              },
              {
                title: 'Горные туры',
                description: 'Треккинг, альпинизм, невероятные виды',
                icon: 'Mountain',
                price: 'от 45 000 ₽'
              },
              {
                title: 'Экскурсионные туры',
                description: 'Культура, история, архитектура мировых столиц',
                icon: 'Building2',
                price: 'от 60 000 ₽'
              },
              {
                title: 'Экзотика',
                description: 'Африка, Азия, Латинская Америка',
                icon: 'Globe',
                price: 'от 80 000 ₽'
              },
              {
                title: 'Круизы',
                description: 'Морские путешествия с комфортом',
                icon: 'Ship',
                price: 'от 70 000 ₽'
              },
              {
                title: 'Активный отдых',
                description: 'Дайвинг, серфинг, горные лыжи',
                icon: 'Waves',
                price: 'от 55 000 ₽'
              }
            ].map((tour, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full gradient-orange-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={tour.icon as any} className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{tour.title}</h3>
                  <p className="text-muted-foreground mb-4">{tour.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">{tour.price}</span>
                    <Button variant="ghost" className="group-hover:bg-primary group-hover:text-white transition-colors">
                      Подробнее
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Почему выбирают нас</h2>
              <div className="space-y-6">
                {[
                  { icon: 'Shield', title: 'Надежность', text: 'Работаем официально, все туры застрахованы' },
                  { icon: 'DollarSign', title: 'Лучшие цены', text: 'Прямые договоры с отелями и авиакомпаниями' },
                  { icon: 'Headphones', title: 'Поддержка 24/7', text: 'Всегда на связи в любой точке мира' },
                  { icon: 'Star', title: 'Индивидуальный подход', text: 'Подберем тур под ваши пожелания' }
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
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                  <Icon name="MapPin" className="text-primary" size={120} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна Смирнова',
                text: 'Незабываемая поездка на Мальдивы! Все организовано идеально, спасибо большое команде!',
                rating: 5
              },
              {
                name: 'Дмитрий Петров',
                text: 'Горный тур в Альпы превзошел все ожидания. Профессиональный подход на каждом этапе.',
                rating: 5
              },
              {
                name: 'Елена Иванова',
                text: 'Круиз по Средиземному морю был просто волшебным! Обязательно вернемся к вам снова.',
                rating: 5
              }
            ].map((review, idx) => (
              <Card key={idx} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Свяжитесь с нами</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Оставьте заявку и мы подберем идеальный тур для вас
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
                      placeholder="Расскажите о ваших пожеланиях"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    <Icon name="Send" className="ml-2" size={18} />
                  </Button>
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
              <h3 className="text-2xl font-bold mb-4">ЦЕТ'S GO!</h3>
              <p className="opacity-90">Ваш путь к незабываемым приключениям</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Направления</h4>
              <ul className="space-y-2 opacity-90">
                <li>Европа</li>
                <li>Азия</li>
                <li>Америка</li>
                <li>Африка</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 opacity-90">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Отзывы</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center cursor-pointer">
                  <Icon name="Instagram" size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center cursor-pointer">
                  <Icon name="Facebook" size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center cursor-pointer">
                  <Icon name="Twitter" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center opacity-90">
            <p>© 2024 ЦЕТ'S GO! Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
