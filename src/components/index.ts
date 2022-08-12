import { BasicModule} from "./basic/basic.module";
import {BioModule} from "./bio/bio.module";
import {HealthcheckModule} from "./healthcheck/healthcheck.module";
import {PostModule} from "./post/post.module";
import { WorkModule} from "./work/work.module";

const Components = [BasicModule, BioModule, HealthcheckModule, PostModule, WorkModule];

export { Components }
