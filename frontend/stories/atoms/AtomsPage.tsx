import Button from 'atoms/Button';
import Text from 'atoms/Text';
import Table from 'atoms/Table';
import Label from 'atoms/Label';
import Input from 'atoms/Input';

const entries = [
  ['Button', <Button text="Click me" />],
  ['Text', <Text text="Hello random text" />],
  ['label', <Label>Username:</Label>],
  ['Input', <Input placeholder="Enter email" value="" />],
];

export default function AtomsPage() {
  return <Table width="full" indexed headers={['name', 'component']} entries={entries} />;
}
