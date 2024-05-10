import Link from 'next/link';

const AddDealButton = () => {
  return (
    <Link href="/adddeal">
      <button className='add-company-button'>Add Deal</button>
    </Link>
  );
};

export default AddDealButton;