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

    this.githubAPIService.getUserRepositoryBranches(this.user, this.repo).subscribe(
      async (data: any) => {
        const diagramDefinition = this.generateDiagramDefinition(data);
        const {svg} = await mermaid.render('graphDiv', diagramDefinition);

        chartContainer.innerHTML = svg;
      },
      (error) => {
        console.log('Wystąpił błąd podczas pobierania szczegółów repozytorium:', error);
        this.repository = null;
      }
    );




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

      if (name !== 'main') {
        diagramDefinition += `branch ${name}\n`;

      }

      diagramDefinition += `commit\n`;

      //diagramDefinition += `checkout ${name}\n`;

      // if (name !== 'main') {
      //   diagramDefinition = `commit id: ${commit.sha}\n`;
      //
      //
      // }
    });

    console.log(diagramDefinition);
    return diagramDefinition;
  }
}
