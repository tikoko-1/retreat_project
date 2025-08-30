import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface AboutSectionProps {
  aboutImage: string;
}

export default function AboutSection({ aboutImage }: AboutSectionProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl lg:text-5xl mb-6 font-light">
              Sacred space meets modern comfort
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Nestled in Bali's lush jungle, The Sanctuary offers an unparalleled retreat experience. Our thoughtfully designed spaces support transformation and growth.
              </p>
              <p>
                From our acoustically perfect yoga shala to our sustainably sourced cuisine, every detail has been considered for your group's success.
              </p>
            </div>
          </div>
          
          <div>
            <ImageWithFallback
              src={aboutImage}
              alt="Retreat center interior"
              className="w-full aspect-[4/3] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}