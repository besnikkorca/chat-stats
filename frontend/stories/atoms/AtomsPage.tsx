import Button from 'atoms/Button';
import Text from 'atoms/Text';
import Table from 'atoms/Table';
import Label from 'atoms/Label';
import Input from 'atoms/Input';

const entries = [
  { name: 'Button', component: <Button text="Click me" /> },
  { name: 'Text', component: <Text text="Hello random text" /> },
  { name: 'label', component: <Label>Username:</Label> },
  { name: 'Input', component: <Input placeholder="Enter email" value="" /> },
];

export default function AtomsPage() {
  return <Table width="full" indexed headers={['name', 'component']} entries={entries} />;
}
