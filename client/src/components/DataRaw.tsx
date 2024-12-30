const DataRow = ({ label, value }:{label:string,value:string}) => (
    <div className="flex border-b border-gray-200 py-3">
      <span className="w-1/3 text-gray-600 font-medium">{label}:</span>
      <span className="w-2/3 text-gray-900">{value || 'N/A'}</span>
    </div>
  );

export default DataRow