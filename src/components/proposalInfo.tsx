import Slider from './slider';

const proposalData = {
  description:
    "The primary objective of this proposal is to fortify Flare Dao's infrastructure against potential threats, ensuring the continued integrity and reliability of our decentralized ecosystem. By implementing advanced security measures, we aim to instill confidence among our community members, developers, and stakeholders, fostering a secure environment for collaboration and innovation. The primary objective of this proposal is to fortify Flare Dao's infrastructure against potential threats, ensuring the continued integrity and reliability of our decentralized ecosystem. By implementing advanced security measures, we aim to instill confidence among our community members, developers, and stakeholders, fostering a secure environment for collaboration and innovation.",
};
const ProposalInfo = () => {
  const { description } = proposalData;
  return (
    <div className='-z-20 grow bg-dark px-12 py-6 md:py-12 md:pl-40 md:pr-24'>
      <div className='flex flex-col gap-12 md:flex-row md:justify-center md:gap-36'>
        <div className='flex w-full flex-col gap-4 md:w-7/12'>
          <p className='text-justify text-xl font-bold leading-6 text-light'>
            Description
          </p>
          <p className='break-words text-justify text-base font-medium leading-6 text-inactive'>
            {description}
          </p>
        </div>
        <div className='w-full text-light md:w-4/12'>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default ProposalInfo;
