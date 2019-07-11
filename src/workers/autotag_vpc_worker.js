import AutotagEC2Worker from './autotag_ec2_worker';
import AWS from 'aws-sdk';
import co from 'co';

class AutotagVPCWorker extends AutotagEC2Worker {

  /* tagResource
  ** method: tagResource
  **
  ** Tag the newly created VPC
  */

  tagResource() {
    let _this = this;
    return co(function* () {
      let roleName = _this.roleName;
      let credentials = yield _this.assumeRole(roleName);
      _this.ec2 = new AWS.EC2({
        region: _this.event.awsRegion,
        credentials: credentials
      });
      yield _this.tagEC2Resources([_this.getVPCId()]);
    });
  }

  getVPCId() {
    return this.event.responseElements.vpc.vpcId;
  }
};

export default AutotagVPCWorker;
