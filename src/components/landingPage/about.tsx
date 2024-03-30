import { about } from "@/assets/assets";

const AboutSection = () => {
  return (
    <section className=" py-16 md:py-24">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={about}
            alt=""
            className="w-[350px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                UniConnect
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                UniConnect is a specialized web platform designed to simplify
                the lives of university students by providing a convenient
                marketplace for buying, selling, and trading used textbooks,
                stationery, and other study materials. Our mission is clear: to
                facilitate connections among students, empowering them to
                support each other academically and financially.
              </p>
              <p className="text-xl text-muted-foreground mt-4">
                At UniConnect, we recognize the challenges students face when it
                comes to acquiring necessary study materials at reasonable
                prices. With the ever-rising costs of textbooks and limited
                budgets, finding affordable solutions can be daunting. That's
                where UniConnect steps in. We offer a streamlined platform where
                students can effortlessly discover great deals on textbooks or
                effortlessly pass on materials they no longer require.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
