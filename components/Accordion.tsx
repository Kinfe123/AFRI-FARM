import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Accordions() {
  return (
    <Accordion type="single" collapsible className="w-2/3">
      <AccordionItem value="item-1">
        <h1 className="text-center text-4xl font-bold text-purple-600  mb-10 ">
          What may you ask?
        </h1>
        <AccordionTrigger>
          <p className="text-gray-400">
            How can we ensure access to quality educational resources for
            individuals in remote or underprivileged areas?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By leveraging technology and digital platforms, we can develop online
          educational resources that can be accessed remotely, bridging the gap
          for individuals in remote or underprivileged areas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <p className="text-gray-400">
            How can we optimize the utilization of existing learning resources
            to make them more effective and accessible?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By implementing effective curation, organization, and search
          functionalities, we can ensure that existing learning resources are
          easily discoverable, well-utilized, and accessible to learners.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <p className="text-gray-400">
            How can standardized learning paths or curriculum frameworks be
            created to help learners navigate through courses and resources?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By collaborating with educators and subject matter experts, we can
          develop standardized learning paths or curriculum frameworks that
          provide clear guidance and structure for learners, facilitating their
          navigation through various courses and resources.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          <p className="text-gray-400">
            How can learners discover and access relevant courses and learning
            materials with the challenge of multiple platforms hosting them?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By creating centralized platforms or directories that aggregate and
          categorize courses from multiple platforms, learners can easily
          discover and access relevant courses and learning materials in one
          place.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          <p className="text-gray-400">
            How can we improve knowledge retention and practical application of
            online course content?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By incorporating interactive elements, practical exercises, and
          real-world applications within online courses, learners can enhance
          their knowledge retention and actively apply what they've learned.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          <p className="text-gray-400">
            How can we address the issue of outdated or irrelevant learning
            resources?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By establishing systems for regular content review, updating, and user
          feedback, we can ensure that learning resources remain up-to-date,
          relevant, and aligned with the latest knowledge and industry trends. .
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>
          <p className="text-gray-400">
            How can we foster collaboration and knowledge sharing among learners
            and educators?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By integrating social learning features, discussion forums, and
          collaborative projects within learning platforms, we can encourage
          learners and educators to interact, share insights, and collaborate on
          knowledge sharing.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>
          <p className="text-gray-400">
            How can learners navigate and make sense of the overwhelming amount
            of available information?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By providing intelligent search algorithms, personalized
          recommendations, and categorization systems, learners can efficiently
          navigate and make sense of the vast amount of available information,
          focusing on what is most relevant to their learning goals.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-9">
        <AccordionTrigger>
          <p className="text-gray-400">
            How can learning paths and resources be personalized to meet
            individual learners' needs, preferences, and learning styles?
          </p>
        </AccordionTrigger>
        <AccordionContent>
          By leveraging learner analytics, adaptive learning technologies, and
          user profiling, learning paths and resources can be tailored to match
          individual learners' needs, preferences, and learning styles, creating
          a more personalized learning experience.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
