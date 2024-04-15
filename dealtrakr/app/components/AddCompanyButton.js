import Link from 'next/link';

const AddCompanyButton = () => {
  return (
    <Link href="/addcompany">
      <button className='add-company-button'>Add Company</button>
    </Link>
  );
};

export default AddCompanyButton;