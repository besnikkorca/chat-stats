import Button from 'atoms/Button';
import Text from 'atoms/Text';
import Table from 'atoms/Table';
import Label from 'atoms/Label';
import Input from 'atoms/Input';
import FormInput from 'molecules/FormInput/FormInput';

const entries = [['Form input', <FormInput label="Password:" value="" placeholder="Password" />]];

export default function MoleculesPage() {
  return <Table width="full" indexed headers={['name', 'component']} entries={entries} />;
}
