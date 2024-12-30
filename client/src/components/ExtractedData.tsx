import DataRow from "./DataRaw";

export interface ExtractedDataProps{
    frontImageData:{
        aadhaarNumber:string;
        dob:string;
        gender:string;
        name:string;
        rawText:string;
    },
    backImageData:{
        pincode:string;
        coDetails:string;
        soDetails:string;
        rawText:string;
        address:string;
    }
}

export default function ExtractedData({data,loading}:{data:ExtractedDataProps,loading:boolean}) {
    console.log('inside the ExractDat :',data,loading)
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Parsed Data</h2>
        <div className="space-y-1">
          <DataRow label="Aadhar Number" value={data?.frontImageData?.aadhaarNumber} />
          <DataRow label="Name" value={data?.frontImageData?.name} />
          <DataRow label="Date of Birth" value={data?.frontImageData?.dob} />
          {data?.backImageData?.coDetails ? (
            <DataRow label="C/O" value={data?.backImageData?.coDetails} />
          ) : (
            <DataRow label="S/O" value={data?.backImageData?.soDetails} />
          )}
          <DataRow label="Gender" value={data?.frontImageData?.gender} />
          <DataRow label="Pincode" value={data?.backImageData?.pincode} />
          <DataRow label="Address" value={data?.backImageData?.address} />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">API Response</h2>
        <div className="space-y-1">
            {/* <DataRow label="Aadhar Number" value={data?.frontImageData?.aadhaarNumber} />
          <DataRow label="Name" value={data?.frontImageData?.name} />
          <DataRow label="Date of Birth" value={data?.frontImageData?.dob} />
          <DataRow label="Gender" value={data?.frontImageData?.gender} />
          <DataRow label="Address" value={data?.backImageData?.pincode} />
          <DataRow label="Pincode" value={data?.backImageData?.pincode} /> */}
          <h3>Front Image</h3>
          <address>
            {data?.frontImageData?.rawText}
          </address>
          <h3>Back Image</h3>
          <address>
            {data?.backImageData?.rawText}
          </address>
        </div>
      </div>

      {/* Verification Status Bar */}
      <div className={`mt-4 p-3 rounded-lg ${
        loading ? 'bg-green-50' : 'bg-red-50'
      }`}>
        <div className="flex items-center justify-between">
          <span className="font-medium">Verification Status</span>
          <span className={`${
            loading ? 'text-green-700' : 'text-red-700'
          } font-medium`}>
            {loading ? 'Verification Successful' : 'Verification Failed'}
          </span>
        </div>
      </div>

    </div>
  )
}
