import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../providers/LanguageProvider";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.email"),
      value: "contact@example.com",
      link: "mailto:contact@example.com",
    },
    {
      icon: Phone,
      title: t("contact.phone"),
      value: "+1 234 567 890",
      link: "tel:+1234567890",
    },
    {
      icon: MapPin,
      title: t("contact.location"),
      value: t("contact.locationValue"),
      link: null,
    },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de envío de formulario
    alert(`${t("contact.success")}\n\n${t("contact.successDesc")}`);

    // Limpiar formulario
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
   return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl mb-4">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl mb-6">{t("contact.info")}</h2>
              <p className="text-muted-foreground mb-8">
                {t("contact.infoDesc")}
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <Card key={info.title}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{info.title}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p>{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <h3 className="text-xl mb-2">{t("contact.callCta")}</h3>
                <p className="opacity-90 mb-4">
                  {t("contact.callCtaDesc")}
                </p>
                <Button variant="secondary" className="w-full">
                  {t("contact.scheduleCall")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t("contact.namePlaceholder")}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("contact.emailPlaceholder")}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contact.subject")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder={t("contact.subjectPlaceholder")}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("contact.messagePlaceholder")}
                      rows={8}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    {t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="text-lg mb-2">{t("contact.responseTime")}</h3>
              <p className="text-muted-foreground">
                {t("contact.responseTimeDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


