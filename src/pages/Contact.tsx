  import { useState, useEffect } from "react";
  import Navbar from "@/components/Navbar";
  import Footer from "@/components/Footer";
  import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { useLanguage } from "@/contexts/LanguageContext";

  export default function Contact() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    // Track form submission status: 'idle' | 'sending' | 'sent' | 'error'
    const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
    // Detailed error message for user feedback
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
      // Scroll to top when component mounts
      window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (status === 'error') {
        setStatus('idle');
        setErrorMsg(null);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('sending');
      setErrorMsg(null);

      try {
        const response = await fetch('https://backend.goldenhillls.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setStatus('sent');
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } else {
          throw new Error(data.error || 'Failed to send enquiry');
        }
      } catch (err: any) {
        console.error('Submit error:', err);
        setErrorMsg(err.message || 'An unexpected error occurred');
        setStatus('error');
      }
    };

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20">
          {/* Header Section */}
          <section className="relative py-20 bg-gradient-to-r from-sand-light to-sand-light/50 dark:from-sand-dark/30 dark:to-sand-dark/10">
            <div className="container relative z-10">
              <div className="max-w-3xl mx-auto text-center animate-fade-in">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  Send us a message
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6 text-foreground">
                  {t.contact.title}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {t.contact.subtitle}
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
              <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
              <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sand/50 blur-3xl" />
            </div>
          </section>

          {/* Contact Information & Form */}
          <section className="section">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="animate-fade-in [animation-delay:100ms]">
                  <h2 className="text-2xl font-bold mb-6">{t.contact.getInTouch}</h2>

                  <div className="glass-card p-6 space-y-6 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t.contact.phone}</h3>
                        <p className="text-muted-foreground"><a href="tel:9870450601">+919870450601</a></p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t.contact.email}</h3>
                        <p className="text-muted-foreground"><a href="mailto:goldenhill.ajay@gmail.com">goldenhill.ajay@gmail.com</a></p>
                      </div>
                    </div>


                  </div>

                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7058.21309910624!2d76.106407!3d27.806491!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396d4999a7153a69%3A0x70f5e32293a5ee5c!2sGolden%20Hills!5e0!3m2!1sen!2sin!4v1752409112372!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Location Map"
                    />
                  </div>
                </div>

                {/* Contact Form */}
                <div className="animate-fade-in [animation-delay:300ms]">
                  <h2 className="text-2xl font-bold mb-6">{t.contact.sendMessage}</h2>

                  <div className="glass-card p-6">
                  {status !== 'sent' ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">{t.contact.fullName}</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter name"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">{t.contact.email}</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter Email"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">{t.contact.phoneNumber}</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Enter Phone Number"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subject">{t.contact.subject}</Label>
                            <Input
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="Enter Subject"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">{t.contact.message}</Label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder={t.contact.howCanWeHelp}
                            className="w-[99.4%] m-0 min-h-[100px] p-4 ml-0.5 rounded-md border border-input bg-background"
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full btn-primary" disabled={status === 'sending'}>
                          <Send className="mr-2 h-4 w-4" />
                          {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                        </Button>
                        {status === 'error' && errorMsg && (
                          <p className="text-red-600 mt-2">{errorMsg}</p>
                        )}
                      </form>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{t.contact.messageSent}</h3>
                        <p className="text-muted-foreground mb-6">
                          {t.contact.thankYou}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="section bg-muted">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
                <h2 className="text-3xl font-bold mb-4">{t.contact.faq}</h2>
                <p className="text-muted-foreground">
                  {t.contact.faqSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in [animation-delay:200ms]">
                {[
                  {
                    questionKey: "checkInOut",
                    icon: <Clock className="h-5 w-5 text-primary" />
                  },
                  {
                    questionKey: "parking",
                    icon: <MapPin className="h-5 w-5 text-primary" />
                  },
                  {
                    questionKey: "pets",
                    icon: <MapPin className="h-5 w-5 text-primary" />
                  },
                  {
                    questionKey: "breakfast",
                    icon: <MapPin className="h-5 w-5 text-primary" />
                  },
                  {
                    questionKey: "transfers",
                    icon: <MapPin className="h-5 w-5 text-primary" />
                  },
                  {
                    questionKey: "amenities",
                    icon: <MapPin className="h-5 w-5 text-primary" />
                  },
                ].map((faq, index) => (
                  <div key={index} className="glass-card p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      {t.contact.questions[faq.questionKey].question}
                    </h3>
                    <p className="text-muted-foreground">
                      {t.contact.questions[faq.questionKey].answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }
