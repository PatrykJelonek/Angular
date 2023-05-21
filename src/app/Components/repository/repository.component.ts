import {ActivatedRoute} from "@angular/router";
import {GithubAPIService} from "../../Services/github-api.service";
import {Component, OnInit, ViewChild, ElementRef, Renderer2, ContentChild} from '@angular/core';
import mermaid from "mermaid";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})

export class RepositoryComponent {
  user: string = '';
  repo: string = '';
  repository: any;
  branches: any;

  @ViewChild('branchesChart', { read: ElementRef }) branchesChart!:ElementRef;
  constructor(private route: ActivatedRoute, private githubAPIService: GithubAPIService, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = params['user'];
      this.repo = params['repo'];
      this.getRepositoryDetails();
      this.getBranches();

    });
  }

  async ngAfterViewInit() {
    mermaid.initialize({
      startOnLoad: false
    });

    const chartContainer = this.branchesChart.nativeElement;

        chartContainer.innerHTML = '';

        const diagramDefinition = this.generateDiagramDefinition(this.branches);
        const {svg} = await mermaid.render('graphDiv', diagramDefinition);

        chartContainer.innerHTML = svg;


  }

  getRepositoryDetails() {
    this.githubAPIService.getUserRepository(this.user, this.repo).subscribe(
      (data: any) => {
        this.repository = data;
      },
      (error) => {
        console.log('Wystąpił błąd podczas pobierania szczegółów repozytorium:', error);
        this.repository = null;
      }
    );
  }

  getBranches() {
    this.githubAPIService.getUserRepositoryBranches(this.user, this.repo).subscribe(
      (data: any) => {
        this.branches = data;
      },
      (error) => {
        console.log('Wystąpił błąd podczas pobierania szczegółów repozytorium:', error);
        this.repository = null;
      }
    );
  }

  private generateDiagramDefinition(branches: any[]): string {
    let diagramDefinition = 'gitGraph\n';

    branches.forEach((branch) => {
      const {name, commit} = branch;
      const parentCommit = commit && commit.parents && commit.parents.length > 0 ? commit.parents[0].sha : '';

      // diagramDefinition += `branch ${name}\n`;
      // diagramDefinition += 'checkout main\n'
    });
    diagramDefinition = '' +
      '      gitGraph\n' +
      '        branch MetroLine1\n' +
      '        commit id:"NewYork"\n' +
      '        commit id:"Dallas"\n' +
      '        branch MetroLine2\n' +
      '        commit id:"LosAngeles"\n' +
      '        commit id:"Chicago"\n' +
      '        commit id:"Houston"\n' +
      '        branch MetroLine3\n' +
      '        commit id:"Phoenix"\n' +
      '        commit type: HIGHLIGHT id:"Denver"\n' +
      '        commit id:"Boston"\n' +
      '        checkout MetroLine1\n' +
      '        commit id:"Atlanta"\n' +
      '        merge MetroLine3\n' +
      '        commit id:"Miami"\n' +
      '        commit id:"Washington"\n' +
      '        merge MetroLine2 tag:"MY JUNCTION"\n' +
      '        commit id:"Boston"\n' +
      '        commit id:"Detroit"\n' +
      '        commit type:REVERSE id:"SanFrancisco"'
    console.log(diagramDefinition);
    return diagramDefinition;
  }
}
