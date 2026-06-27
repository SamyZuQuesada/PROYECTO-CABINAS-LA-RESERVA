import { motion } from "motion/react";
import { useLanguage } from "../providers/LanguageProvider";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
export function About() {
  const { t } = useLanguage();

  const Badge = ({
    children,
    variant = "secondary",
  }: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
  }) => {
    const variantClass =
      variant === "secondary"
        ? "bg-secondary/10 text-secondary"
        : "bg-primary/10 text-primary";
    return (
      <span
        className={`text-sm font-medium px-3 py-1 rounded-full ${variantClass}`}
      >
        {children}
      </span>
    );
  };

  const skills = {
    frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    backend: ["Node.js", "C# .NET", "C++", "REST APIs"],
    tools: ["Git", "Docker", "Figma", "Postman"],
  };
  const experience = [
    {
      icon: Briefcase,
      title: t("about.seniorDev"),
      company: t("about.seniorDevCompany"),
      period: t("about.seniorDevPeriod"),
      description: t("about.seniorDevDesc"),
    },

    {
      icon: Briefcase,
      title: t("about.frontendDev"),
      company: t("about.frontendDevCompany"),
      period: t("about.frontendDevPeriod"),
      description: t("about.frontendDevDesc"),
    },
    {
      icon: GraduationCap,
      title: t("about.degree"),
      company: t("about.degreeCompany"),
      period: t("about.degreePeriod"),
      description: t("about.degreeDesc"),
    },
  ];

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
          <h1 className="text-4xl md:text-5xl mb-4">{t("about.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Profile Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUxNzY1OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Profile"
              className="rounded-2xl shadow-2xl w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl mb-4">{t("about.hello")}</h2>
            <p className="text-muted-foreground text-lg">{t("about.bio1")}</p>
            <p className="text-muted-foreground text-lg">{t("about.bio2")}</p>
            <p className="text-muted-foreground text-lg">{t("about.bio3")}</p>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="text-3xl">{t("about.skills")}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl mb-4">{t("about.frontend")}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl mb-4">{t("about.backend")}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl mb-4">{t("about.tools")}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl mb-8">{t("about.experience")}</h2>
          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl mb-1">{item.title}</h3>
                        <p className="text-primary mb-2">{item.company}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.period}
                        </p>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
