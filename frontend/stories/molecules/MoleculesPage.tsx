import Table from 'atoms/Table';
import FormInput from 'molecules/FormInput/FormInput';

const entries = [
  {
    name: 'Form input',
    component: <FormInput label="Password:" value="" placeholder="Password" />,
  },
];

export default function MoleculesPage() {
  return <Table width="full" indexed headers={['name', 'component']} entries={entries} />;
}
