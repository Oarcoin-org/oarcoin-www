import Image from "next/image";

import { Heading } from "@/components/heading";
import { GET_OARCOIN_BANNER_BODY, GET_OARCOIN_BANNER_TITLE } from "@/lib/constants";

const Banner = () => {
  return (
    <section className="w-full py-14">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="items-center flex">
          <Image
            src="/assets/illustrations/hand-left.svg"
            alt=""
            width={1000}
            height={1000}
            className="w-1/2 lg:w-full object-contain mix-blend-multiply opacity-90"
          />
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <Heading
            as="h2"
            text={GET_OARCOIN_BANNER_TITLE}
            className="text-4xl sm:text-5xl"
          />
          <p className="max-w-xl font-sans text-base leading-relaxed sm:text-lg">
            {GET_OARCOIN_BANNER_BODY}
          </p>
        </div>

        <div className="items-center justify-end flex">
          <Image
            src="/assets/illustrations/hand-right.svg"
            alt=""
            width={1000}
            height={1000}
            className="w-1/2 lg:w-full mix-blend-multiply opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
